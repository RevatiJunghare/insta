import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { AuthEntity } from './auth/auth.entity';
import { PostModule } from './posts/post.module';
import { PostEntity } from './posts/post.entity';
import { CommentsModule } from './comments/comments.module';
import { commentsEntity } from './comments/comments.entity';

@Module({
  imports: [
    AuthModule,
    PostModule,
    CommentsModule,
    //ConfigModule.forRoot({isGlobal:true}),
    TypeOrmModule.forRoot({
      type:'postgres',
      host:'localhost',
      port:5432,
      username:'postgres',
      password:'root',
      database:'insta',
      entities:[AuthEntity,PostEntity,commentsEntity],
      synchronize:true
    }),
    
  ],
})
export class AppModule {}
