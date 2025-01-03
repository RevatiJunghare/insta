import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comments.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(JwtAuthGuard)
  @Get('all-comments/:id')
  ALLComments(@Param() id: number) {
    return this.commentService.AllComents(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('add-comment/:id')
  CreateComment(@Body() formData: any, @Req() req: Request, @Param() id: number) {
    const user = req['user'];
    const ID = id['id'];
    return this.commentService.CreateComment(formData, user, ID);
  }
}
