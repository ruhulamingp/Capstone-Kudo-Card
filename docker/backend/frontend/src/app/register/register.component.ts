import { Component, OnInit } from '@angular/core';
import { storageConfig } from './../shared/storageconfig';
import { apiEndPoints } from './../shared/apiendpoints';
import { environment } from './../../environments/environment';
import { LoginResponseDTO, Company, UserData } from './../DTO/LoginResponseDTO';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatProgressButtonOptions } from 'mat-progress-buttons';

import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import * as _ from 'lodash';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  startValidation = false;
  validEmail = true ;
  company: UserData = null;
  loginResponse: LoginResponseDTO;
  errorResponse = {
    error : false ,
    message : ''

  };
  btnOpts: MatProgressButtonOptions = {
    active: false,
    text: 'Register',
    buttonColor: 'primary',
    barColor: 'primary',
    spinnerColor: 'accent',
    spinnerSize: 19,
    raised: false,
    stroked: false,
    fullWidth: true,
    mode: 'indeterminate',
    value: 0,
    customClass: 'text-white',
    disabled: false,

  };


  constructor(private http: HttpClient, private auth: AuthService,
              private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/posts']);
    }
  }



  closeAlert(): void {
    console.log('error clicked');
    this.clearErrorObject();
  }



  onEmailChange(newValue) {
    const validEmailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (validEmailRegEx.test(newValue)) {
        this.validEmail = true;
        console.log('valid email');
    }else {
      this.validEmail = false;
      console.log('invalid email');
    }

  }

  onSubmit(form: NgForm) {
    const values = form.value;

    if (form.valid)
    {
    const payload = {
      email: values.username,
      password: values.password,
      name: values.name
    };

    this.clearErrorObject();

    this.btnOpts.active = true;


    this.http.post<LoginResponseDTO>( environment.apiUrl + apiEndPoints.register, payload)
    .subscribe({
      next: data => {


        this.openSnackBar('Registration Successful');
        setTimeout(() => {

          this.router.navigate(['/login']);

        }, 3000);



      },
      error: error => {
        console.log(error.error.message);
        this.errorResponse.error = true ;
        this.errorResponse.message = error.error.message ? error.error.message : 'Invalid Information' ;
        this.btnOpts.active = false;

      }
  });


    }
    else
    {
      console.log('not valid');
      this.startValidation = true;
    }





  }

  openSnackBar(message: string) {

    this.snackBar.open(message, '', {
        duration: 3000,
        horizontalPosition: 'end' ,
        verticalPosition: 'bottom',
      });

}


  private clearErrorObject() {

    this.errorResponse.error = false;
    this.errorResponse.message = '';
  }

}
