import { HttpClient, HttpHandler,HttpEvent, HttpInterceptor, HttpRequest, HttpHeaders } from '@angular/common/http';
import { EnvironmentInjector, Injectable } from '@angular/core';
import { StorageService } from '../../../auth/service/storage/storage.service';
import { Observable } from 'rxjs';
// import { environment } from '../../environments/environment';

const BASIC_URL = ["http://localhost:8080/"]

@Injectable({
  providedIn: 'root'
})
export class AdminService{

  constructor(private http:HttpClient) { }

  // it will call backend api to add student into database by admin
  addStudent(studentDto:any):Observable<any>{
    
    // console.log(headers: this.createAuthorizationHeader());   
     return this.http.post<[]> (BASIC_URL+ "api/admin/student",studentDto,
      {
      
        headers:this.createAuthorizationHeader(),
     }
    )
  }

  // createAuthorizationHeader():HttpHeaders{
  //   let authHeaders:HttpHeaders = new HttpHeaders();
  //   return authHeaders.set('Authorization', "Bearer yJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkB0ZXN0LmNvbSIsImlhdCI6MTc0Mjk3NjI5NiwiZXhwIjoxNzQyOTc3Mzc2fQ.tZYHtplYQe0Hm4f1QXPwakDBxW8-1TWlQMWozbZqQB4");
  // }



  getAllStudents(): Observable<any>{
    return this.http.get<[]>(BASIC_URL + "api/admin/students",
      {
        headers:this.createAuthorizationHeader() 
      }
    )
  }


  deleteStudent(studentId:number):Observable<any>{
    return this.http.delete<[]>(BASIC_URL + `api/admin/student/${studentId}`,
      {
        headers:this.createAuthorizationHeader() 
      }
    )
  }

  getStudentById(studentId:number): Observable<any>{
    return this.http.get<[]>(BASIC_URL + `api/admin/student/${studentId}`,
      {
        headers:this.createAuthorizationHeader() 
      }
    )
  }

  updateStudent(studentId:number, studentDto:any):Observable<any>{
   
     return this.http.put<[]> (BASIC_URL+ `api/admin/student/${studentId}`,studentDto,
      {
        headers:this.createAuthorizationHeader(),
     }
    );
  }

  getAllAppliedLeaves(): Observable<any>{
    return this.http.get<[]>(BASIC_URL + `api/admin/leaves`,
      {
         headers:this.createAuthorizationHeader()
      }
    )
  }
  changeLeaveStatus(leaveId:number, status:string): Observable<any>{
    return this.http.get<[]>(BASIC_URL + `api/admin/leave/${leaveId}/${status}`,
      {
         headers:this.createAuthorizationHeader()
      }
    )
  }



  // #################### Teacher Operations ###############################

  addTeacher(teacherDto:any):Observable<any>{
    
     return this.http.post<[]> (BASIC_URL+ "api/admin/teacher",teacherDto,
      {
        headers:this.createAuthorizationHeader(),
      })
  }
  
  getAllTeachers():Observable<any>{
    
     return this.http.get<[]> (BASIC_URL+ "api/admin/teachers",
      {
        headers:this.createAuthorizationHeader(),
      })
  }

  deleteTeacher(teacherId:any):Observable<any>{
    return this.http.delete<[]> (BASIC_URL+ `api/admin/teacher/${teacherId}`,
      {
        headers:this.createAuthorizationHeader(),
      })
  }

  getTeacherById(teacherId:number): Observable<any>{
    return this.http.get<[]>(BASIC_URL + `api/admin/teacher/${teacherId}`,
      {
        headers: this.createAuthorizationHeader(),
      });
  }

  updateTeacher(teacherId:number, teacherDto:any): Observable<any>{
    return this.http.put<[]>(BASIC_URL + `api/admin/teacher/${teacherId}`,teacherDto,
      {
        headers: this.createAuthorizationHeader(),
      });
  }

  
  createAuthorizationHeader():HttpHeaders{
    let authHeaders: HttpHeaders = new HttpHeaders();
    // console.log("Bearer "+StorageService.getToken());
    return authHeaders.set(
      
      "Authorization", "Bearer "+StorageService.getToken()
    )
  }
  
}
