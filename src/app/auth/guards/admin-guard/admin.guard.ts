import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { state } from '@angular/animations';
import { StorageService } from '../../service/storage/storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: "root"
})

// Guard will provide a barier that without login cant access dashboard section
export class AdminGuard implements CanActivate{
  
  
  constructor(
    private router:Router,
    private snackbar: MatSnackBar
  ){}

  canActivate(
    next:ActivatedRouteSnapshot,
    state:RouterStateSnapshot
  ):boolean{
    // if a student logged in and he want to access "admin/dashboard" then it dont allow to access admin dashboard 
    // and navigate the same student dashboard page and show an error on snackbar and return false.

    //when student loggedin and want to access admin/dashboard then it first check if student loggedin or not 
    // if loggedin then deny the access so thats why student logic write in adminGuard file and admin logic in studentGuard

    if(StorageService.isStudentLoggedIn()){
      this.snackbar.open("You dont have access to this page", "Close", {duration:5000});
      this.router.navigateByUrl("/student/dashboard");
      return false;
    } 
    // if toket is not present in localstorage means any one not loggedin so it will navigate into login page 
    // and show an error through snackbar
    else if(!StorageService.hasToken()){
      StorageService.logout();
      this.router.navigateByUrl("/login");
      this.snackbar.open("You are not loggedIn", "Close",{duration:5000})
      return false;
    }
    return true;
  }
}

