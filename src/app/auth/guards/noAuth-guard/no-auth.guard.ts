import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { state } from '@angular/animations';
import { StorageService } from '../../service/storage/storage.service';

@Injectable({
  providedIn: "root"
})

// Guard will provide a barier that without login cant access dashboard section
export class noAuthGuard implements CanActivate{
  
  
  constructor(
    private router:Router
  ){}

  canActivate(
    next:ActivatedRouteSnapshot,
    state:RouterStateSnapshot
  ):boolean{
  
    if(StorageService.hasToken() && StorageService.isStudentLoggedIn()){
      this.router.navigateByUrl("/student/dashboard");
      return false;
    } 
    else if(StorageService.hasToken() && StorageService.isAdminLoggedIn()){
      this.router.navigateByUrl("/admin/dashboard");
      return false;
    }
    return true;
  }
}
