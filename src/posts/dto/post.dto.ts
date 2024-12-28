import { IsNotEmpty, IsString } from "class-validator"

export class postdto{
    @IsNotEmpty()
    @IsString()
    title: string;
  
    @IsNotEmpty()
    @IsString()
    description: string;
  
    @IsNotEmpty()
    @IsString()
    createdBY: string;

    @IsNotEmpty()
    media: string; // This column will store file URLs or paths

    
    @IsString()
    username?:string
}