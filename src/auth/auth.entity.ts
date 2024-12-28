import { PostEntity } from "src/posts/post.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'users'})
export class AuthEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    username:string

    @Column({
        unique:true
    })
    email:string

    @Column()
    password:string

    @CreateDateColumn()
    createdAt:Date

    @OneToMany(()=>PostEntity, (post)=>post.user)
    posts:PostEntity[]
}