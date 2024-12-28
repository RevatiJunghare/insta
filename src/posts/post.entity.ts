import { AuthEntity } from "src/auth/auth.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity({name:"posts"})
export class PostEntity{
    @PrimaryGeneratedColumn()
    blog_id:number

    @Column()
    title:string

    @Column()
    description:string

    @Column()
    createdBY:string

    @Column({default:0})
    like_count:number

    @Column({default:0})
    comment_count:number

    @CreateDateColumn()
    createdAt:Date

    @CreateDateColumn()
    updatedAt:Date

    @Column({ type: 'text', nullable: true })
    media: string; // This column will store file URLs or paths


    @ManyToOne(() => AuthEntity, (user) => user.username)
    @JoinColumn({ name: 'user_id' })  // Use foreign key column 'user_id'
    user: AuthEntity;  // Association with AuthEntity
    
    @Column({ nullable: true })
    username: string;  // Remove this if unnecessary, or leave it for storing username string

}