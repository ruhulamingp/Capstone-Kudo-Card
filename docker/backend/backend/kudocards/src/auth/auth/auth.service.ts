import { User } from '../../Entity/user.entity';
import { Injectable, HttpStatus, HttpException, Res } from '@nestjs/common';
import { JwtService } from  '@nestjs/jwt';
import { UserService } from  '../user/user.service';



@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
       
    ){ }

    private async validate(userData: User): Promise<User> {
        return await this.userService.findByEmailPasword(userData.email,userData.password);
    }

  


    public async login(user: User): Promise< any | { status: number }>{
      
      
     return this.userService.findByEmailPasword(user.email,user.password).then( (userData) => {

        

        if(!userData){
         
            throw new HttpException({ status: HttpStatus.UNAUTHORIZED, message: 'Username or password is invalid' }, HttpStatus.UNAUTHORIZED);
           
        }

        

        const payload = {

           
          email : userData.email,
          sub : userData.id,
          username : userData.name
        

        }
   
        const accessToken = this.jwtService.sign(payload);

        return {
           'expires_in': 3600,
           'access_token': accessToken,
           'user_info': payload,
           'status': 200
        };
      },(error)=>{

       
        return error ;
      });
        
        

      
    }

    public async register(user: User): Promise<any>{
        return this.userService.create(user)
    }


}
