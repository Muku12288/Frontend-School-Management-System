import { Component } from '@angular/core';
import { AuthService } from '../service/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { StorageService } from '../service/storage/storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  
  loginForm:FormGroup | undefined;

  constructor(
    private service:AuthService,
    private fb:FormBuilder,
    private router:Router,
    private snackbar:MatSnackBar
  ){}
// this hook use to call services, and it is a lifecycle hook in angular.
//It is used to perform any additional initialization that is required for the component
  ngOnInit(){
    this.loginForm = this.fb.group({
      email:['', Validators.required],
      password:['', Validators.required]
    })
  }
//after taking input from user send email and password into login() at authservice.ts
  login(){
    console.log(this.loginForm.value);
    
    this.service.login(
      this.loginForm.get(['email'])!.value,
      this.loginForm.get(['password'])!.value
      
    ).subscribe((response)=>{
      console.log(response);


      // Logic for showing admin dashboard to admin & student component to student
      if(StorageService.isAdminLoggedIn()){

        this.router.navigateByUrl("admin/dashboard");
      
      }else if(StorageService.isStudentLoggedIn()){

        this.router.navigateByUrl("student/dashboard");
      }


    }),
    error => {
      if(error.status == 406){
        this.snackbar.open("User is not active", "Close", {duration: 5000})
      }
      else{
        this.snackbar.open("Bad credentials", "Close", {duration: 5000})
      }
    } 
  }
  
  

}
