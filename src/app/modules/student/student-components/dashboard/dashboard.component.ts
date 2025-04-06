import { Component } from '@angular/core';
import { StudentService } from '../../student-service/student.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  student: any;

  constructor(
    private service: StudentService,
  ){}

  ngOnInit(){
    this.getStudentId();
  }

  getStudentId(){
    this.service.getStudentById().subscribe((res)=>{
      // console.log(res);
      this.student = res.studentDto;
    })
  }
  

}
