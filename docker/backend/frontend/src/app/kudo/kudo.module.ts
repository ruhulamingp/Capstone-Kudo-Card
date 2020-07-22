
import { CreatePostComponent } from './../dialog/createposts/CreatePostComponent';
import { CommonImportsModule } from './../commonimports/common-imports/common-imports.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KudoComponent } from '../kudo/kudo.component';



@NgModule({
  declarations: [KudoComponent],
  imports: [
    CommonModule,
    CommonImportsModule
  ],
  exports: [
    CommonImportsModule,
    KudoComponent
  ],
  providers: [],

})
export class KudoModule { }
