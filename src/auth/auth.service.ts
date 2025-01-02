import {
  Body,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
  Req,
} from '@nestjs/common';
import { Authdto } from './dto';
import { AuthEntity } from 'src/auth/auth.entity';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import { updateauthdto } from './dto/updateauth.dto';

const logger = new Logger('AUTH-SERVICE');

@Injectable({})
export class AuthService {
  constructor(
    @InjectRepository(AuthEntity)
    private authrepository: Repository<AuthEntity>,
  ) {}

  // User Registartion
  async Signup(formdata: Authdto): Promise<AuthEntity> {
    // logger.debug('form dataaaaaaaaaaaaaaaaaaaaa',formdata)        // generate a salt
    const salt = await bcrypt.genSalt();
    //hashed value
    const password = await bcrypt.hash(formdata.password, salt);

    const user = new AuthEntity();
    user.username = formdata.username;
    user.email = formdata.email;
    user.password = password; //pass hashed value of password
    return await user.save();
  }

  // User login
  async login(@Body() data: any): Promise<any> {
    // bcrypt.compareSync(body.password, bcrypt.hash);
    try {
      const user = await this.authrepository.findOneBy({ email: data.email });
      if (!user) {
        return { message: 'Invalid Credentials' };
      }

      const isPasswordValid = await bcrypt.compare(
        data.password,
        user.password,
      );
      // if(!isPasswordValid){
      //     return {"message":"Password Mismatch"}
      // }

      if (!isPasswordValid) {
        throw new HttpException('Invalid password!', HttpStatus.UNAUTHORIZED);
      }

      const payload = { email: user.email , username:user.username, user_id:user.id};

      const token = jwt.sign(
        payload, // Payload
        'instauser', // Secret key
      );

      return {
        message: 'Login Successful',
        token: token,
      };
    } catch (err) {
      console.log('err', err);
    }
  }

  async AllUsers() {
    return await this.authrepository.find();
  }

  async UpdateUser(UserId: number, formdata: updateauthdto) {
    const User = await this.authrepository.findOneBy({ id: UserId });

    if (!User) {
      throw new NotFoundException(`Post with ID ${UserId} not found`);
    }

    const NewUser = Object.assign(User, formdata);

    return this.authrepository.save(NewUser);
  }

  async DeleteUser(UserId: number) {
    await this.authrepository.delete({ id: UserId });
    return `user with ID ${UserId} deleted successfully`;
  }
}
