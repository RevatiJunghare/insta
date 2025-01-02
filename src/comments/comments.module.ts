import { Module } from "@nestjs/common";
import { CommentService } from "./comments.service";
import { CommentsController } from "./comments.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { commentsEntity } from "./comments.entity";
import { PostEntity } from "src/posts/post.entity";

@Module({
    imports:[TypeOrmModule.forFeature([commentsEntity,PostEntity])],
    controllers: [CommentsController],
    providers:[CommentService]
})


export class CommentsModule{}