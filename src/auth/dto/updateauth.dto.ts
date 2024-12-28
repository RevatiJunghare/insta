import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class updateauthdto{
   @IsString()
   @IsOptional()
    username:string

    @IsString()
   @IsOptional()
    email:string

    @IsString()
   @IsOptional()
    password:string
}