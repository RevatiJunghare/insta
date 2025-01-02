import { Injectable, NotFoundException, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './post.entity';
import { In, Repository } from 'typeorm';
import { postdto } from './dto';
import { updatepostdto } from './dto/updatepost.dto';
import { AuthEntity } from 'src/auth/auth.entity';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
// import { ConfigService } from '@nestjs/config';

@Injectable({})
export class PostService {
  // private readonly s3Client = new S3Client({
  //   region: this.configService.getOrThrow('AWS_S3_REGION')
  // })
  constructor(
    @InjectRepository(PostEntity)
    private postrepository: Repository<PostEntity>,

    @InjectRepository(AuthEntity)
    private authrepository: Repository<AuthEntity>,

    // private readonly configService:ConfigService  //for file uploads
  ) {}


  // for single image
  // async Upload(fileName:string, file:Buffer){
  //    await this.s3Client.send(
  //     new PutObjectCommand({
  //       Bucket: 'intsa-uploader',
  //       Key: fileName,
  //       Body: file
  //     })
  //    )
  // }

  // for multiple images
  // async Upload(files: { fileName: string; file: Buffer; }[]) {
  //   const uploadPromises = files.map(({ fileName, file }) =>
  //     this.s3Client.send(
  //       new PutObjectCommand({
  //         Bucket: "intsa-uploader", // Your bucket name
  //         Key: fileName,
  //         Body: file,
  //       })
  //     )
  //   );
  
  //   // Wait for all uploads to complete
  //   await Promise.all(uploadPromises);
  //   console.log("All files uploaded successfully!");
  // }


  async createPost(data: postdto): Promise<PostEntity> {
    try {
      const posts = this.postrepository.create(data);

      return await this.postrepository.save(posts);
    } catch (err) {
      console.log('Error in creating post', err);
      throw new Error('Failed to create post. Please try again later.');
    }
  }



  async getallposts() {
    try {
      const ALLBlogs: any[] = await this.postrepository.find()
      const UniqueIds = []
      ALLBlogs.forEach((el)=>{
         if(!UniqueIds.includes(el.createdBY)){
           UniqueIds.push(el.createdBY)
         }

      })

      console.log("UniqueIds",UniqueIds,ALLBlogs)
      
      const users = await this.authrepository.find({
        where: {
          id: In(UniqueIds), // 'id' is the column name in your User entity //The In function filters records where the id matches any value in the array UniqueIds
        },
        select: ["id", "email", "username"]
      });
      console.log("UniqueIds",users, "\n\n")

      ALLBlogs.map((el)=>{
        // console.log("123456", el)
        const user = users.filter(e1 => {
          if(e1.id.toString() === el.createdBY.toString())
            return e1;
        })
        if (user)
          el['createdBY'] = user[0]
      }) 
      
      return ALLBlogs;

    } catch (err) {
      console.log('Error', err);
      throw new Error('Failed to getting posts');
    }
  }

  async updatepost(BlogId: number, data: updatepostdto) {
    try {
      const post = await this.postrepository.findOneBy({ blog_id: BlogId });

      if (!post) {
        throw new NotFoundException(`Post with ID ${BlogId} not found`);
      }

      const newPost = Object.assign(post, data); //merge new with old data
      newPost.updatedAt = new Date();

      return this.postrepository.save(newPost);
    } catch (err) {
      console.log('error', err);
      throw new Error('Not able to update this post');
    }
  }

  async deletepost(BlogId: number) {
    try {
      await this.postrepository.delete({ blog_id: BlogId });
      return `Post with ID ${BlogId} deleted successfully`;
    } catch (err) {
      console.log('error', err);
      throw new Error('Not able to delete this post');
    }
  }



  async getallusersPost(user){
    console.log("user@@@@@@@@@@@@@@@",user)
    try {
      const ALLBlogs: any[] = await this.postrepository.find({
        where: {
          createdBY: user.user_id
        }
      })
      const UniqueIds = []
      ALLBlogs.forEach((el)=>{
         if(!UniqueIds.includes(el.createdBY)){
           UniqueIds.push(el.createdBY)
         }
      })
      
      const users = await this.authrepository.find({
        where: {
          id: In(UniqueIds), // 'id' is the column name in your User entity
        },
        select: ["id", "email", "username"]
      });
      console.log("UniqueIds",users, "\n\n")

      ALLBlogs.map((el)=>{
        // console.log("123456", el)
        const user = users.filter(e1 => {
          if(e1.id.toString() === el.createdBY.toString())
            return e1;
        })
        // if (user)
        //   el['createdBY'] = user[0]
      }) 
      
      return ALLBlogs;

    } catch (err) {
      console.log('Error', err);
      throw new Error('Failed to getting posts');
    }
  }



}
