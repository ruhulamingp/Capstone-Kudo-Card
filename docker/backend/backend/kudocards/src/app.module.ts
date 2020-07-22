import { KudoModule } from './kudo/kudo.module';
import { KudoService } from './kudo/kudo.service';


import { Module, HttpModule } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { KudoController } from './kudo/kudo.controller';





@Module({
  imports: [AuthModule,HttpModule.register({
    timeout: 15000,
    maxRedirects: 5,
  }),
  ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'public'),
  }),KudoModule],
  controllers: [],
  providers: [KudoService],
  exports: [KudoService],
})
export class AppModule {}
