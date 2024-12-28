// import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
// import { Request } from 'express';
// import jwt from 'jsonwebtoken'

// @Injectable()
// export class JwtAuthGuard implements CanActivate {

//   async canActivate(context: ExecutionContext): Promise<boolean> {
    
//     const request: Request = context.switchToHttp().getRequest();
//     console.log("request",request)
//     const token = request.headers.authorization
//     const actualToken = token.split(' ')[1];
//     console.log("token",token)

//     if (!token) {
//       return false; // No token, deny access
//     }

//     try {
//       // const payload = jwt.verify(actualToken, 'instauser'); // Validate token
//       const payload = jwt.verify(token, 'instauser', function(err, decoded) {
//         console.log("dedcoded",decoded) // bar
//       });
//       // request['user'] = payload; // Attach decoded payload to request
//       console.log("request in auth",payload)
//       return true; // Allow access
//     } catch (error) {
//       console.error('Error in token verification:', error);
//   return false; // Deny access if token is invalid
//     }
//   }
// }



// import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
// import { Request } from 'express';
// import * as jwt from 'jsonwebtoken';

// @Injectable()
// export class JwtAuthGuard implements CanActivate {

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const request: Request = context.switchToHttp().getRequest();
//     // console.log("request", request.headers);

//     const token = request.headers['authorization'];
//     console.log("request", token);


//     try {
//       // Synchronously verify the token
//       const payload = jwt.verify(token, 'instauser');
      
//       console.log("Decoded payload:", payload); // Log the decoded token payload

//       // Attach user to the request object
//       request['user'] = payload; 
      
//       return true; // Token is valid, allow access
//     } catch (error) {
//       console.error('Error in token verification:', error);
//       return false; // Invalid token, deny access
//     }
//   }
// }


import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';  // Corrected import

@Injectable()
export class JwtAuthGuard implements CanActivate {

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = request.headers['authorization'];
    console.log("request", token);

    if (!token) {
      return false; // No token, deny access
    }

    try {
      // Synchronously verify the token
      const payload = jwt.verify(token, 'instauser');
      console.log("Decoded payload:", payload); // Log the decoded token payload

      // Attach user to the request object
      request['user'] = payload; 
      
      return true; // Token is valid, allow access
    } catch (error) {
      console.error('Error in token verification:', error);
      return false; // Invalid token, deny access
    }
  }
}


