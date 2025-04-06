import { HttpResponse } from '@angular/common/http';
import {Injectable } from '@angular/core';


// Key of local storage
const USER = "c_user"
const TOKEN = "c_token"


@Injectable({
  providedIn: 'root'
})
export class StorageService {
  
  constructor() { }

  //It will use to prevent "window not defined" and "localstorage not defined" Error..............
  // if(typeof(window) !== "undefined" && window.localStorage){}
  

  // saveUser() store the user id & role into window localStorage, call from authService.ts component
  public saveUser(user:any){
    if(typeof(window) !== "undefined" && window.localStorage){
      window.localStorage.removeItem(USER)
      window.localStorage.setItem(USER, JSON.stringify(user))
    }
  }
// It store the token into window localStorage
  public saveToken(token:string){
    if(typeof(window) !== "undefined" && window.localStorage){
      window.localStorage.removeItem(TOKEN);
      window.localStorage.setItem(TOKEN, token);
    }
    return "";
    // local storage will store (key, value) pair
  }

  // return admin token if it is present into localstorage
  static getToken():string{
    if(typeof(window) !== "undefined" && window.localStorage){
      return window.localStorage.getItem(TOKEN);
    }
    return "";
  }
// }
  static getUser(): any{
    if(typeof(window) !== "undefined" && window.localStorage){
    return JSON.parse(localStorage.getItem(USER));
    }
    return;
  }
  static getUserId(): number{
    if(typeof(window) !== "undefined" && window.localStorage){
      const user = this.getUser();
      if(user == null) return -1;

    return user.userId;
    }
    return -1;
  }

  
  static getUserRole():string{
    const user = this.getUser();
    if(user == null){
      return '';
    }
    return user.role;
  }

  // make it static because, dont create object of this class into login.component
  // so make it static and able to access by class name in loginComponent 
  static isAdminLoggedIn():boolean{
    if(this.getToken() ==null){
      return false;
    }

    const role:string = this.getUserRole();
    return role == "ADMIN";
  }
  
  static isStudentLoggedIn():boolean{
    if(this.getToken() ==null){
    return false;
    }
    
    const role:string = this.getUserRole();
    return role == "STUDENT";
  }

  //call from app.html
  static logout(){
    if(typeof(window) !== "undefined" && window.localStorage){
    window.localStorage.removeItem(TOKEN)
    window.localStorage.removeItem(USER)
    }
  }
  // call from in noAuth.ts
  static hasToken():boolean{
    if(this.getToken()==null){
      return false
    }
    return true
  }

}
