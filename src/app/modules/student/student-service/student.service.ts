import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from '../../../auth/service/storage/storage.service';

const BASIC_URL = ["http://localhost:8080/"];


@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(
    private http: HttpClient,
    ) { }



    getStudentById(): Observable<any>{
      return this.http.get<[]>(BASIC_URL + `api/student/${StorageService.getUserId()}`,
        {
          headers:this.createAuthorizationHeader() 
        }
      )
    }

    getAllAppliedLeavesByStudentId(): Observable<any>{
      return this.http.get<[]>(BASIC_URL + `api/student/leave/${StorageService.getUserId()}`,
        {
          headers:this.createAuthorizationHeader()
        }
      )
    }

    applyLeave(studentLeaveDto): Observable<any>{
      
      console.log(studentLeaveDto);
      
      studentLeaveDto.userid = StorageService.getUserId();
      return this.http.post<[]>(BASIC_URL + `api/student/leave`, studentLeaveDto,
        {
          headers:this.createAuthorizationHeader() 
        }
      )
    }

    updateStudent(studentDto): Observable<any>{
      return this.http.put<[]>(BASIC_URL + `api/student/${StorageService.getUserId()}`, studentDto,
        {
          headers:this.createAuthorizationHeader() 
        }
      )
    }


    createAuthorizationHeader():HttpHeaders{
    let authHeaders: HttpHeaders = new HttpHeaders();
    // console.log("Bearer "+StorageService.getToken());
    return authHeaders.set(
      
      "Authorization", "Bearer "+StorageService.getToken()
    )
  }

}
