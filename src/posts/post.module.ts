import { Module } from "@nestjs/common";
import { PostService } from "./post.service";
import { PostController } from "./post.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostEntity } from "./post.entity";
import { AuthEntity } from "src/auth/auth.entity";
import { ConfigService } from "@nestjs/config";
import { ThrottlerModule } from "@nestjs/throttler";

@Module({
    imports:[TypeOrmModule.forFeature([PostEntity,AuthEntity]),ThrottlerModule.forRoot()],
   controllers:[PostController],
   providers:[PostService,ConfigService]

})
export class PostModule{}