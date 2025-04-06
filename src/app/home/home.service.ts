import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


const BASI_URL = ["http://localhost:8080/"]

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private http: HttpClient
  ) { }

  getAllTeacher(): Observable<any>{
    return this.http.get<[]>(BASI_URL + "teachers")
  }
}
