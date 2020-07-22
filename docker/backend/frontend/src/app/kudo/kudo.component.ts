import { PostListItem } from './../services/dataModel/PostListItem';
import { PostService } from './../services/PostService';
import { CreatePostComponent } from './../dialog/createposts/CreatePostComponent';
import { LoggedInDataService } from './../shared/LoggedInDataService';
import { AuthService } from './../shared/auth.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { QueryParams } from '../DTO/QueryParamDTO';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-kudo',
  templateUrl: './kudo.component.html',
  styleUrls: ['./kudo.component.scss']
})
export class KudoComponent implements OnInit {

  public displayedColumns: string [] = ['id', 'title', 'subTitle'];
  public model: string;
  public currentEmail = '';

  public modelChanged: Subject<string> = new Subject<string>();
  colorProp = '#e69525';
  queryParam: QueryParams = {} as QueryParams;
  public allDataLoaded  = false ;
  public filterReceive = false ;
  public filterSend = false ;
  public searchQuery = '';

  constructor(public matDialog: MatDialog, private auth: AuthService ,
              private postService: PostService, private spinner: NgxSpinnerService, private loggedUser: LoggedInDataService) {

      this.modelChanged.pipe(
        debounceTime(300),
        distinctUntilChanged())
        .subscribe((model) => {
            this.model = model;
            this.changeDataOnFilter();
        });

    }

  ngOnInit(): void {


    this.currentEmail = this.loggedUser.getLoggedinuserInfo(this.auth).email;
    this.getDataFromServer();
  //  this.setFilterCompanyData();

  }
  ngOnDestroy() {

    this.modelChanged.unsubscribe();
  }

  public logout() {

    this.auth.logout ();
}

public deleteItem(item: PostListItem){

  this.postService.delete(`${item.id}`).subscribe ((response) => {

    console.log(response);
    this.postService.getPostListSubject().getValue().forEach( (pitem, index) => {
      if (pitem.id === item.id) { this.postService.getPostListSubject().getValue().splice(index, 1); }
    });


  });
}

public editItem(item: PostListItem){

  this.showUpdateDialog(item);


}

public showCreateDialog() {

  this.matDialog.open(CreatePostComponent, {

     width: '80%',

    });
 }

public showUpdateDialog(item: PostListItem) {
  this.matDialog.open(CreatePostComponent, {

    width: '80%',
    data: {
      postItem: item
    }

   });

}

public searchChanged(text: string) {
  this.modelChanged.next(text);
}

async getDataFromServer() {
  this.queryParam = {} as QueryParams;
  this.queryParam.take = 10;
  this.queryParam.skip = 0  ;

  if (this.filterSend) { this.queryParam.fromEmail = this.loggedUser.getLoggedinuserInfo(this.auth).email ; }
  if (this.filterReceive) { this.queryParam.toEmail = this.loggedUser.getLoggedinuserInfo(this.auth).email ; }
  if (this.model && this.model.length > 0) {this.queryParam.query = this.model ; }
  // if (this.selectedTeam && this.selectedTeam.id > 0) {this.queryParam.teamId = this.selectedTeam.id ; }

  console.log(this.queryParam);



  this.postService.getAllPostListItems(this.queryParam).subscribe((postListItems) => {
      this.postService.getPostListSubject().next(postListItems);

  });



}



filterSendChanged() {

  this.filterSend = !this.filterSend ;
  this.changeDataOnFilter();
}

filterReceiveChanged() {

  this.filterReceive = ! this.filterReceive ;
  this.changeDataOnFilter();
}

changeDataOnFilter() {

  this.getDataFromServer();

}


public updatePostList() {
  this.queryParam.take = 10;
  this.queryParam.skip = this.postService.getPostListSubject().getValue() ?
  this.postService.getPostListSubject().getValue().length : 0  ;
  this.postService.getAllPostListItems(this.queryParam).subscribe((postListItems) => {

      if (postListItems.length < 10)
      {
          this.allDataLoaded = true ;
      }
      this.postService.getPostListSubject().getValue().push(...postListItems);
      this.spinner.hide();

  });

}

public getPostList(): Observable<PostListItem[]> {


      return this.postService.getPostListSubject().asObservable();

}

public onScroll() {

  if (!this.allDataLoaded)
  {
  this.updatePostList();
  this.spinner.show();
  }
}


}
