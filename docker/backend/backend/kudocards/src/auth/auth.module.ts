import { usersProviders } from './../Providers/users.provider';
import { config } from './../config/config';
import { DatabaseModule } from './../database/database.module';
import { Module, HttpModule } from '@nestjs/common';
import { UserService } from './user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';

import { JwtStrategy } from './jwt/jwt.strategy';
import { PassportModule } from '@nestjs/passport';




@Module({
    imports: [DatabaseModule,
        PassportModule,
        HttpModule,
        JwtModule.register({
            secret: config.jwtSecret,
            signOptions: { expiresIn: config.jwtExpire },
           
        })
    ],
    controllers: [  
        AuthController
    ],
    providers: [AuthService,
    ...usersProviders,
    UserService,
    JwtStrategy,

   
    ],
    exports:[
        AuthService,
        ...usersProviders,
        UserService,
        JwtStrategy,
      

    ]
      
})
export class AuthModule {}
