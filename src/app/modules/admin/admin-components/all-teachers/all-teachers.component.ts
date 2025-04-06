import { Component } from '@angular/core';
import { AdminService } from '../../admin-service/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-all-teachers',
  templateUrl: './all-teachers.component.html',
  styleUrl: './all-teachers.component.css'
})
export class AllTeachersComponent {

  teachers = [];

  constructor(
    private adminService:AdminService,
    private snackBar:MatSnackBar
  ){}

  ngOnInit(){
    this.getAllTeachers();
  }

  getAllTeachers(){
    this.adminService.getAllTeachers().subscribe((res)=>{
      // console.log(res);
      this.teachers = res;
      
    })
  }

  deleteTeacher(teacherId:number){
    this.adminService.deleteTeacher(teacherId).subscribe((res)=>{
      // console.log(res);
      this.getAllTeachers();
      this.snackBar.open("Teacher Deleted Successfully", "Close", {duration:5000})
    })
  }

}
