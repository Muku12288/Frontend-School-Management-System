import { Component } from '@angular/core';
import { AdminService } from '../../admin-service/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Teacher } from '../../teacher';

@Component({
  selector: 'app-all-teachers',
  templateUrl: './all-teachers.component.html',
  styleUrl: './all-teachers.component.css'
})
export class AllTeachersComponent {

  teachers:Teacher[] = [];
  filterTeacher:Teacher[] = [];

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
      this.filterTeacher = res
    })
  }

  deleteTeacher(teacherId:number){
    this.adminService.deleteTeacher(teacherId).subscribe((res)=>{
      // console.log(res);
      this.getAllTeachers();
      this.snackBar.open("Teacher Deleted Successfully", "Close", {duration:5000})
    })
  }

  searchTeacher(input:any){
    const value = input.trim().toLowerCase();
    if(value){
      this.filterTeacher = this.teachers.filter(item=>item.id.toString().includes(input)
                                        || item.name.toLowerCase().includes(input.toLowerCase())
                                        || item.department.toLowerCase().includes(input.toLowerCase()))
    }else{
      this.getAllTeachers();
    }
    

    if(this.filterTeacher.length == 0){
      this.snackBar.open("No Record Found !", "Close", {duration: 5000})
    }
    this.teachers = this.filterTeacher;
  }


}
