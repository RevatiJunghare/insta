import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Patch, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthEntity } from 'src/auth/auth.entity';
import { Repository } from 'typeorm';
import { Authdto } from './dto';
import { updateauthdto } from './dto/updateauth.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';

const logger = new Logger('AUTH-CONT')
@Controller('auth')
export class AuthController {
  constructor(
    // @InjectRepository(AuthEntity) 
    private readonly authservice: AuthService,
    
    ) {}

  @Post('signup')
  async UserRegistarton(@Body() formdata:Authdto) : Promise<AuthEntity>{
    logger.debug('auth controllerrrrrrrr', formdata)
    return await this.authservice.Signup(formdata);
  }


  @Post('signin')
  async signin(@Body() dataa:any){
     return await this.authservice.login(dataa)
  }

  // @UseGuards(JwtAuthGuard)
  @Get('allusers')
  async AllUsers(){
    return await this.authservice.AllUsers()
  }

  // @UseGuards(JwtAuthGuard)
  @Patch('edit/:id')
  UpdateUser(@Param('id',ParseIntPipe) id:number, @Body() formdata:updateauthdto ){
     return this.authservice.UpdateUser(id,formdata)
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  DeleteUser(@Param('id',ParseIntPipe) id:number){
    return this.authservice.DeleteUser(id)
  }


}
