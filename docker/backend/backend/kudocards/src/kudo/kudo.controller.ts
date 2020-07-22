

import { config } from './../config/config';

import { UserService } from './../auth/user/user.service';

import { CreateKudoDto } from './../DTO/CreateKudoDto';


import { KudoService } from './kudo.service';
import { Controller, Body, Get, UseGuards, Request, Query, Post, Delete, Put } from  '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { Posts } from './../Entity/post.entity';




@Controller('kudo')
export class KudoController {

    constructor(private kudoService: KudoService ,  private userService: UserService ,
){

    }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    findAll(@Request() req , @Query() query ) : Promise<Posts[]> {
       
        return this.kudoService.findAllFromDB(query);

    }

    @UseGuards(AuthGuard('jwt'))
    @Delete("delete")
    deleteItem(@Request() req , @Query() query ) : Promise<any> {
       
        return this.kudoService.deleteItem(req.user.email,query);

    }

    @UseGuards(AuthGuard('jwt'))
    @Put("update")
    updateItem(@Body() createKudoDto : CreateKudoDto, @Request() req ) : Promise<any> {
        createKudoDto.fromEmail = req.user.email;
        createKudoDto.fromName = req.user.username ;
        
        createKudoDto.kudoId  =  JSON.parse(JSON.stringify(createKudoDto.kudoType)).id ;
        return this.kudoService.update(createKudoDto);

    }


    @UseGuards(AuthGuard('jwt'))
    @Post("create")
    create(@Body() createKudoDto : CreateKudoDto,@Request() req) : Promise<CreateKudoDto> {
       
        console.log('kudo create request');
        createKudoDto.fromEmail = req.user.email;
        createKudoDto.fromName = req.user.username ;
        
        createKudoDto.kudoId  =  JSON.parse(JSON.stringify(createKudoDto.kudoType)).id ;
     


        console.log(createKudoDto);


        return  this.kudoService.create(createKudoDto).then((kudo)=> {
            //getting current users
            if (config.sendKudoMail || config.sendCoreNotification)
            this.userService.findByEmail(kudo.fromEmail).then((user)=> {
                //sending email
           

                 //Sending notification
                
                
            }); 
            
          
            return kudo
        }).catch((err)=> {

            return err ;
        });

    }




}
