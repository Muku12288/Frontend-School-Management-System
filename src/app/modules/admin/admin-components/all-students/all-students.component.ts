import { Component } from '@angular/core';
import { AdminService } from '../../admin-service/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-all-students',
  templateUrl: './all-students.component.html',
  styleUrl: './all-students.component.css'
})
export class AllStudentsComponent {
  students:any;
  constructor(private service: AdminService,
    private snackBar: MatSnackBar
  ){}

  ngOnInit(){
    this.getAllStudents();
  }

  getAllStudents(){
    this.service.getAllStudents().subscribe((res)=>{
      console.log(res);
      this.students= res;
    })
  }


  deleteStudent(studentId:number){
    // console.log(studentId);
    
    this.service.deleteStudent(studentId).subscribe((res)=>{
      // console.log(res);
      this.getAllStudents();
      this.snackBar.open("Student deleted Successfully", "Close", {duration:5000})
    })
  }
}
