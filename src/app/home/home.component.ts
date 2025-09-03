import { Component } from '@angular/core';
import { HomeService } from './home.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
  teachers:any[]=[];

  constructor(
    private service:HomeService
  ){}

  ngOnInit(){
    this.getAllTeacher()
  }
  getAllTeacher(){
    this.service.getAllTeacher().subscribe((res)=>{
      // console.log(res);
      this.teachers = res
      
    })
  }

}
