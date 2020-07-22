import { postsProviders } from './../Providers/posts.provider';
import { usersProviders } from '../Providers/users.provider';

import { UserService } from './../auth/user/user.service';
import { KudoService } from './kudo.service';
import { Module, HttpModule } from '@nestjs/common';
import { KudoController } from './kudo.controller';
import { DatabaseModule } from './../database/database.module';


@Module({
  imports:[DatabaseModule,HttpModule],
  controllers: [KudoController],
  exports:[ ...usersProviders,
    UserService,KudoService,...postsProviders],
  providers:[KudoService,UserService,
    ...usersProviders,...postsProviders],
})
export class KudoModule {}
