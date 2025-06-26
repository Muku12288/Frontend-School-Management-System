import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../../admin-service/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Admin } from '../../admin';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-all-students',
  templateUrl: './all-students.component.html',
  styleUrl: './all-students.component.css'
})
export class AllStudentsComponent implements AfterViewInit{

  // here Admin is object of admin interface(admin.ts) where define student data format
  students:Admin[] = [];
  filterStudent:Admin[] = [];
  @ViewChild(MatSort) sort: any;

  constructor(private service: AdminService,
    private snackBar: MatSnackBar
  ){}

  displayedColumns: string[] = ['id', 'name','gender', 'email', 'dob', 'studentClass', 'address'];
  dataSource = new MatTableDataSource<Admin>();

  
  getAllStudents(){
    this.service.getAllStudents().subscribe((res)=>{
      console.log(res);
      this.students= res;
      this.dataSource = new MatTableDataSource<Admin>(res);
      
    })
  }

  //******* SORTING NOT WORK *********************/
  ngAfterViewInit(): void {
    this.getAllStudents();
    this.dataSource.sort = this.sort; //for sort
  }

  deleteStudent(studentId:number){
    // console.log(studentId);
    
    this.service.deleteStudent(studentId).subscribe((res)=>{
      // console.log(res);
      this.getAllStudents();
      this.snackBar.open("Student deleted Successfully", "Close", {duration:5000})
    })
  }

  searchStudent(input:any){
    this.filterStudent = this.students.filter(items=>items.name.toLowerCase().includes(input.toLowerCase()) 
                          || items.id.toString().includes(input)
                          || items.email.toLowerCase().includes(input.toLowerCase())
                          || items.address.toLowerCase().includes(input.toLowerCase())
                          || items.studentClass.toLowerCase().includes(input.toLowerCase()));

    if(this.filterStudent.length == 0){
      this.snackBar.open("No Record Found !", "Close", {duration: 5000})
    }
    
    this.dataSource = new MatTableDataSource<Admin>(this.filterStudent);
  }
  

}
