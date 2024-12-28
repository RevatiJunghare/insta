import { IsOptional, IsString } from "class-validator"

export class updatepostdto{
    @IsString()
    @IsOptional()
    title:string

    @IsString()
    @IsOptional()
    description:string

    @IsString()
    @IsOptional()
    media:string

    @IsString()
    username:string
}