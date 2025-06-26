import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { log } from 'node:console';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { StorageService } from '../storage/storage.service';

const url = ['http://localhost:8080/']
export const AUTH_HEADER = 'authorization';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
      private storageService:StorageService
      //inject storageservice
  ) {}

// this method will call /authenticate (post Api) 
// after that api will dont return anything but set jwt token into header
//return Id and role as a HttpResponse
// this method was call from login.component.ts component

  login(email:String, password:String):Observable<any>{

    return this.http.post(url + 'authenticate', {email, password},{observe: 'response'})
      .pipe(
        tap(__ => this.log("User Authentication")),
        map((res: HttpResponse<any>)=>{
            this.storageService.saveUser(res.body);
            // find token length from response header, after that break the token
            const tokenLength = res.headers.get(AUTH_HEADER).length;
            const bearerToken = res.headers.get(AUTH_HEADER).substring(7, tokenLength);
            this.storageService.saveToken(bearerToken);

            return res; 
          }
        ),
        // catchError((error: HttpErrorResponse) => {
        // // console.error('Status Code:', error.status);       //  this is the status code
        // // console.error('Error Message:', error.message);
        // return throwError(() => error);
        // })

      );
  }


  log(message:String){
    console.log(message);
    
  }

}
