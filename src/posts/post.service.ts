import { Injectable, NotFoundException, Req } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PostEntity } from "./post.entity";
import { Repository } from "typeorm";
import { postdto } from "./dto";
import { updatepostdto } from "./dto/updatepost.dto";
import { AuthEntity } from "src/auth/auth.entity";

@Injectable({})
export class PostService{
    constructor(
        @InjectRepository(PostEntity)
        private postrepository : Repository<PostEntity>,
        //  private authrepository: Repository<AuthEntity>
    ){}

  async createPost(data:postdto):Promise<PostEntity>{
    // console.log(data)
    try{
        // const posts = this.postrepository.create(data)
        // return await this.postrepository.save(posts)
        // const posts = this.postrepository.create(data)
        // const newBlog = this.postrepository.create({
        //     ...postdto,
        //     username: user.username
        //   });
        // Create a new post entity

    // Ensure the username is set explicitly
   // posts.username = data.username;
   //console.log(posts)
    // Save the post to the database




    // console.log('Incoming data:', data); // Log incoming data
    const posts = this.postrepository.create(data);
    // console.log('Created post object:', data.username); // Log post object
    
    posts.username = data.username; // Explicitly set username
    // console.log('Post with username set:', posts); // Log updated post

   return await this.postrepository.save(posts); // Save to DB




    // const user = await this.authrepository.findOneBy({ username: data.username });

    // if (!user) {
    //   throw new Error('User not found');
    // }

    // const post = this.postrepository.create({
    //   ...data,
    //   user: user, // Associate the post with the user
    // });

    // console.log('Created post object:', post); // Log post object
    // return await this.postrepository.save(post); // Save to DB



    }catch(err){
        console.log("Error in creating post",err)
        // throw new Error('Failed to create post. Please try again later.');
    }

  }



  async getallposts(){
    try{
        return await this.postrepository.find()
    }catch(err){
        console.log("Error",err)
        throw new Error('Failed to getting posts');
    }
    
  }

  async updatepost(BlogId:number, data:updatepostdto){
    try{
        const post = await this.postrepository.findOneBy({blog_id:BlogId})

    if (!post) {
        throw new NotFoundException(`Post with ID ${BlogId} not found`);
    }

    const newPost = Object.assign(post,data) //merge new with old data
    newPost.updatedAt = new Date()

    return this.postrepository.save(newPost)
    }catch(err){
        console.log("error",err)
        throw new Error('Not able to update this post')
    }
  }

  async deletepost(BlogId:number){
    try{
        await this.postrepository.delete({blog_id:BlogId})
        return `Post with ID ${BlogId} deleted successfully`;
    }catch(err){
        console.log("error",err)
        throw new Error('Not able to delete this post')
    }
  }
}