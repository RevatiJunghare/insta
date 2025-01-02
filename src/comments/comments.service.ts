import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { commentsEntity } from "./comments.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { PostEntity } from "src/posts/post.entity";

@Injectable({})
export class CommentService{
    constructor(
        @InjectRepository(commentsEntity)
        private readonly commentRepository:Repository<commentsEntity>,

        @InjectRepository(PostEntity)
        private readonly postrepository: Repository<PostEntity>
    ){}

    async CreateComment(formData:any, user:any, ID:any){
        const comment = this.commentRepository.create(formData)
        comment['user'] = user
        const numID = Number(ID)

        const postss = await this.postrepository.find({
            where:{
                blog_id : numID
            },
            select:["blog_id","comment_count"]
        })

        comment['post'] = postss

       return this.commentRepository.save(comment)
    }
}