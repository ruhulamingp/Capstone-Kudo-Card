import { KudoModule } from './../kudo/kudo.module';

import { LoginComponent } from './../login/login.component';

import { DeferLoadDirective } from './defer-load.directive';
import { LoggedInDataService } from './../shared/LoggedInDataService';

import { AuthInterceptor } from './../httpinterceptor/auth-interceptor';

import { AuthGuard } from './../guards/auth.guard';
import { AuthService } from './../shared/auth.service';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CreatePostComponent } from '../dialog/createposts/CreatePostComponent';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonImportsModule } from '../commonimports/common-imports/common-imports.module';


import { RegisterComponent } from './../register/register.component';
import { PostService } from '../services/PostService';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    CreatePostComponent,
    LoginComponent,
    DeferLoadDirective

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    KudoModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonImportsModule

  ],
  exports: [DeferLoadDirective],
  entryComponents: [
    CreatePostComponent
  ],
  providers: [OverlayModule, AuthService, AuthGuard, LoggedInDataService, PostService,
   { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
