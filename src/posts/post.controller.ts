import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  Logger,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { PostService } from './post.service';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseEntity, Repository } from 'typeorm';
import { PostEntity } from './post.entity';
import { postdto } from './dto';
import { updatepostdto } from './dto/updatepost.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

const logger = new Logger('post-controller');

//  @UseGuards(JwtAuthGuard)
@Controller('posts')
export class PostController {
  constructor(
    @InjectRepository(PostEntity)
    private postrepository: Repository<PostEntity>,
    private postservice: PostService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('all-posts')
  async ALLPOSTS(@Req() req: any) {
    console.log('request', req);
    return await this.postservice.getallposts();
  }

  @UseGuards(JwtAuthGuard) // Use JwtAuthGuard for the create post route
  @Post('create-post')
  async CREATEPOST(@Body() formdata: postdto, @Req() req: Request) {
    // logger.debug('postreq1111111111111111111111111111111111', req);
    const user = req['user']; // Access the authenticated user
    console.log('Authenticated user:', user);
    formdata.createdBY = user.user_id;

    // Create the post with the username of the authenticated user
    // formdata.username = user.username; // Assuming user has a `username` property

    return await this.postservice.createPost(formdata);
  }

  // @Post('upload')
  // @UseInterceptors(FileInterceptor('blogimg'))
  // async uploadFile(
  //   @UploadedFile(
  //     new ParseFilePipe({
  //       validators: [
  //         // new MaxFileSizeValidator({ maxSize: 2000 }),
  //         // new FileTypeValidator({fileType:'/png'})
  //       ],

  //     }),
  //   )
  //   files: Express.Multer.File[],
  // ) {
  //   console.log('File in upload', files);
  //   console.log('Files in upload', files);

  // // Convert the files into the format expected by your Upload method
  // const fileData = files.map(file => ({
  //   fileName: file.originalname,
  //   file: file.buffer,
  // }));
  //   await this.postservice.Upload(fileData)
  // }

  @Patch('update-blog/:id')
  async UPDATEPOST(
    @Param('id', ParseIntPipe) id: number,
    @Body() formdata: updatepostdto,
  ) {
    //  console.log("id",id)
    //  console.log("formdata",formdata)
    return await this.postservice.updatepost(id, formdata);
  }

  @Delete('delete/:id')
  async DELETEPOST(@Param('id', ParseIntPipe) id: number) {
    return await this.postservice.deletepost(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('alluserspost')
  async ALLUSERSPOST(@Req() req: Request) {
    const user = req['user'];
    return await this.postservice.getallusersPost(user);
  }
}
