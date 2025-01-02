import { Body, Controller, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { CommentService } from "./comments.service";
import { JwtAuthGuard } from "src/auth/auth.guard";

@Controller('comments')
export class CommentsController{
    constructor(
        private readonly commentService : CommentService
    ){}


    @Get('all-comments')
    ALLComments(){
        return "all-comments"
    }

    @UseGuards(JwtAuthGuard)
    @Post('add-comment/:id')
    CreateComment(@Body() formData:any, @Req() req:Request, @Param() id:number){
        const user = req['user']
        const ID = id['id']
        // console.log("blogID",id)
      return this.commentService.CreateComment(formData,user,ID)
    }
}
