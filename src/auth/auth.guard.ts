import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken'; 

@Injectable()
export class JwtAuthGuard implements CanActivate {

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = request.headers['authorization'];
    // console.log("request", token);
    // console.log("request body in guard",request.body)

    if (!token) {
      return false; 
    }

    try {
      // Synchronously verify the token
      const payload = jwt.verify(token, 'instauser');
      // console.log("Decoded payload:", payload); 

      // Attach user to the request object
      request['user'] = payload; 
      
      return true; 
    } catch (error) {
      console.error('Error in token verification:', error);
      return false; 
    }
  }
}


