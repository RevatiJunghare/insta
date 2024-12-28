import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Patch, Post, Req, Request, UseGuards, ValidationPipe } from "@nestjs/common";
import { PostService } from "./post.service";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseEntity, Repository } from "typeorm";
import { PostEntity } from "./post.entity";
import { postdto } from "./dto";
import { updatepostdto } from "./dto/updatepost.dto";
import { JwtAuthGuard } from "src/auth/auth.guard";

const logger = new Logger('post-controller')

//  @UseGuards(JwtAuthGuard)
@Controller('posts')
export class PostController{
    constructor(
        @InjectRepository(PostEntity)
        private postrepository : Repository<PostEntity>,
        private postservice : PostService
    ){}
   
    @UseGuards(JwtAuthGuard)
   @Get('all-posts')
   async ALLPOSTS(@Req() req:any){
    console.log("request",req)
     return await this.postservice.getallposts()
   }

   
  //  @Post('create-post')
  //  async CREATEPOST(@Body() formdata:postdto,@Req() req:Request){
  //   //logger.debug("postreq1111111111111111111111111111111111",req)
  //   // const user = req['user'];
  //   //  console.log(user)
  //    return await this.postservice.createPost(formdata)
  //  }
  @UseGuards(JwtAuthGuard) // Use JwtAuthGuard for the create post route
  @Post('create-post')
  async CREATEPOST(@Body() formdata: postdto, @Req() req: Request) {
    logger.debug("postreq1111111111111111111111111111111111",req)
    const user = req['user'];  // Access the authenticated user
    console.log("Authenticated user:", req);

    // Create the post with the username of the authenticated user
    // formdata.username = user.username; // Assuming user has a `username` property


    return await this.postservice.createPost(formdata);
  }

   
   @Patch('update-blog/:id')
   async UPDATEPOST(@Param('id',ParseIntPipe) id:number, @Body() formdata:updatepostdto){
    //  console.log("id",id)
    //  console.log("formdata",formdata)
    return await this.postservice.updatepost(id,formdata)
   }

   
   @Delete('delete/:id')
   async DELETEPOST(@Param('id',ParseIntPipe) id:number){
     return await this.postservice.deletepost(id)
   }

}