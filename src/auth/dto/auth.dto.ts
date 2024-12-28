import { IsEmail, IsNotEmpty, IsString, Length, Matches } from "class-validator"
import { REGEX } from "src/app.utils";


// class-validator and class-transformer
export class Authdto{
  @IsString()
  username:string;

  @IsEmail()
  @IsNotEmpty()
  email:string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 24)
  @Matches(REGEX.PASSWORD_RULE,{
    message:REGEX.PASSWORD_RULE_MESSAGE
  })
  password:string
}



// if we use class validator in dto file then we have to use "app.useGlobalPipes(new ValidationPipe())" in mainModule.ts file then it will be applicable