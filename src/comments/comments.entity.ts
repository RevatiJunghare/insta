import { AuthEntity } from "src/auth/auth.entity";
import { PostEntity } from "src/posts/post.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name:'comments'})
export class commentsEntity{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    content:string

    @Column({nullable:true})
    ParentId:number

    @CreateDateColumn()
    createdAT:Date

    @UpdateDateColumn()
    updatedAT:Date

    @ManyToOne(()=>AuthEntity, (user)=>user.id)
    user:AuthEntity

    @ManyToOne(()=>PostEntity, (post)=>post.blog_id)
    post:PostEntity
}