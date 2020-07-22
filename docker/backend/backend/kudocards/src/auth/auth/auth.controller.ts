


import { Controller, Post, Body, Get, UseGuards, Request, Res } from  '@nestjs/common';
import { AuthService } from  '../auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../../Entity/user.entity';




@Controller('auth')
export class AuthController {

    constructor(private  readonly  authService:  AuthService){

    }

    @Post('login')
    async login(@Body() user: User): Promise<any> {
      return this.authService.login(user);
    }  

    @Post('register')
    async register(@Body() user: User ): Promise<any> {
       
      return this.authService.register(user);
    } 

  


}
