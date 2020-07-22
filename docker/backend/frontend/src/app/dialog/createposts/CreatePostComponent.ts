import { PostService } from './../../services/PostService';
import { PostListItem } from './../../services/dataModel/PostListItem';
import { CreatePostDto } from './../../services/dataModel/CreatePostDto';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

import { KudoTypeItems } from './../../DTO/LoginResponseDTO';
import { KudoType } from './../../shared/kudoconfig';


import { Component, Inject, OnInit } from '@angular/core';
import { NgForm, FormControl, Validators, FormGroupDirective, FormGroup, FormBuilder } from '@angular/forms';
import {finalize, debounceTime, tap, switchMap, map} from 'rxjs/operators';
import { MatDialogRef } from '@angular/material/dialog';
import * as _ from 'lodash';
import { MatSnackBar } from '@angular/material/snack-bar';







@Component({
    selector: 'app-create-post-dialog',
    templateUrl: 'createPostDialog.html'
})


export class CreatePostComponent implements OnInit {

    public isLoading = false ;
    public newPostModel: CreatePostDto = {} as CreatePostDto;
    public kudoType: KudoTypeItems[];
    validEmail = true ;
    public companyName = '';

    public myForm: FormGroup;

    public searchUserControl = new FormControl('');
    public filteredUsers: any;
    public isALoading = false;
    public errorMsg: string;

    public previousPostItem: PostListItem  ;


    constructor(private dialogRef: MatDialogRef <CreatePostComponent>, private postService: PostService,
                private snackBar: MatSnackBar,
                private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit() {

        this.newPostModel = new CreatePostDto();
        this.kudoType = (KudoType.kudos as []) ;


        if (this.data?.postItem)
       {
         this.previousPostItem = this.data.postItem as PostListItem;


       }

        this.setupUserDataLoad();


    }


    setupUserDataLoad() {

        this.myForm = this.fb.group({
            id: this.previousPostItem ? this.previousPostItem.id : '',
            toName: [ this.previousPostItem ? this.previousPostItem.toName : '' , Validators.required],
            search: this.searchUserControl,
            toEmail: new FormControl( this.previousPostItem ? this.previousPostItem.toEmail : '', [Validators.email, Validators.required]),
            kudoType: [this.previousPostItem ? this.previousPostItem.kudoType : null, Validators.required],
            content: [ this.previousPostItem ? this.previousPostItem.content : '', Validators.required],
            title:  this.previousPostItem ? this.previousPostItem.title : ''

          });




        if (this.previousPostItem?.kudoType)

        {

            const item = JSON.parse(JSON.stringify(this.previousPostItem?.kudoType)) as KudoTypeItems;
            this.myForm.get('kudoType').setValue(KudoType.kudos[item.id - 1] );
            console.log(item.id);
        }





        this.myForm.valueChanges.pipe(
            map((value) => {

                value.title = value.kudoType ? value.kudoType.title : '';
            })
        ).subscribe( value => console.log(value));




    }


    openSnackBar(message: string) {

        this.snackBar.open(message, '', {
            duration: 3000,
            horizontalPosition: 'end' ,
            verticalPosition: 'bottom',
          });

    }

    onSubmit() {


           if (this.myForm.valid)
           {

               this.isLoading = true ;
               console.log(this.myForm.value);
               if (!this.previousPostItem)
               {
                  this.postService.createPost(this.myForm.value)
                  .pipe(finalize (() => this.isLoading = false))
                  .subscribe((newPost: PostListItem) => {

                    if (newPost)
                    {
                        const list = this.postService.getPostListSubject().getValue();
                        list.unshift(newPost);
                        this.postService.getPostListSubject().next(_.cloneDeep(list));
                        this.dialogRef.close();
                        this.openSnackBar('KUDO CARD POSTED');
                    }

                  });

              }
              else {

                this.postService.updatePost(this.myForm.value)
                  .pipe(finalize (() => this.isLoading = false))
                  .subscribe((newPost: PostListItem) => {

                    if (newPost)
                    {
                        // const list = this.postService.getPostListSubject().getValue();
                        // list.unshift(newPost);
                        console.log(newPost);
                        this.postService.getPostListSubject().getValue().forEach( (pitem, index) => {
                          if (this.previousPostItem.id === pitem.id) {
                          this.postService.getPostListSubject().getValue() [index] = newPost; }
                        });
                        this.dialogRef.close();
                        this.openSnackBar('KUDO CARD Updated');
                    }

                  });

              }


           }




    }
}
