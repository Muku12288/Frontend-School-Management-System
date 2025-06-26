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
  // If admin loggedin it will navigate into "/admin/dashboard" and return false
    if(StorageService.isAdminLoggedIn()){
      this.router.navigateByUrl("/admin/dashboard");
      this.snackbar.open("You dont have access to this page", "Close", {duration:5000});
      return false;
    } 
    else if(!StorageService.hasToken()){
      StorageService.logout();
      this.router.navigateByUrl("/login");
      this.snackbar.open("You are not loggedIn", "Close",{duration:5000})
      return false;
    }
    return true;
  }
}


