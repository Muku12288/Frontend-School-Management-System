import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../../admin-service/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Admin } from '../../admin';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-all-students',
  templateUrl: './all-students.component.html',
  styleUrl: './all-students.component.css'
})
export class AllStudentsComponent{

  // here Admin is object of admin interface(admin.ts) where define student data format
  students:Admin[] = [];
  filterStudent:Admin[] = [];
  @ViewChild(MatSort) sort: any;
  @ViewChild(MatPaginator) paginator: any;

  constructor(private service: AdminService,
    private snackBar: MatSnackBar
  ){}

  displayedColumns: string[] = ['id', 'name','gender', 'email', 'dob', 'studentClass', 'address'];
  dataSource = new MatTableDataSource<Admin>();
  
  //******* SORTING NOT WORK *********************/
  ngOnInit(): void {
    this.getAllStudents();
    
  }
  
  getAllStudents(){
    this.service.getAllStudents().subscribe((res)=>{
      console.log(res);
      this.students= res;
      this.dataSource.data = res;
      this.dataSource = new MatTableDataSource<Admin>(res);

      // Override default string sorting

      this.dataSource.sortingDataAccessor = (item, property:string) => {
      if (property === 'studentClass') {
        // Extract the number from the class string like "4th" or "10th"
        return parseInt(item.studentClass);  // assumes class is like "4th", "10th"
      }
        return item[property];
      };
      
      //Set the paginator and sort after dataSource is defined/ initialized
      this.dataSource.sort = this.sort; // sorting
      this.dataSource.paginator = this.paginator; //pagination
      
    })
  }


  
// Delete student implementation

  deleteStudent(studentId:number){
    // console.log(studentId);
    this.service.deleteStudent(studentId).subscribe((res)=>{
      // console.log(res);
      this.getAllStudents();
      this.snackBar.open("Student deleted Successfully", "Close", {duration:5000})

    })
  }

// Searching logic implementation

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
