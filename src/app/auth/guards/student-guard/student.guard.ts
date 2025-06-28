import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { state } from '@angular/animations';
import { StorageService } from '../../service/storage/storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: "root"
})

// Guard will provide a barier that without login cant access dashboard section
export class StudentGuard implements CanActivate{

  
  constructor(
    private router:Router,
    private snackbar: MatSnackBar
  ){}

  canActivate(
    next:ActivatedRouteSnapshot,
    state:RouterStateSnapshot
  ):boolean{
    
    if(StorageService.isStudentLoggedIn()){
      return true;
    } 
    else if(!StorageService.hasToken()){
      StorageService.logout();
      // this.router.navigateByUrl("/login");
      this.router.navigateByUrl("/");
      this.snackbar.open("You are not loggedIn", "Close",{duration:5000})
      return false;
    }
    return true;
  }
}


