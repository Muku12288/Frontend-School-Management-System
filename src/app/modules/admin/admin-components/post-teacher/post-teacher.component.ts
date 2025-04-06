import { Component } from '@angular/core';
import { AdminService } from '../../admin-service/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-post-teacher',
  templateUrl: './post-teacher.component.html',
  styleUrl: './post-teacher.component.css'
})
export class PostTeacherComponent {

  DEPARTMENT:string[]= [
    "CSE", "ECE", "EE", "IT", "ME", "CE", "BCA", "MCA", "Civil"
  ];
  GENDER:string[]= [
    "Male", "Female", "Others"
  ]

  validateForm:FormGroup;
  isSpinning:boolean = false;

  constructor(
    private adminService:AdminService,
    private fb: FormBuilder,
    private snackBar:MatSnackBar
  ){}

  ngOnInit(){
    this.validateForm = this.fb.group({
      name:['', Validators.required],
      gender:['', Validators.required],
      department:['', Validators.required],
      qualification:['', Validators.required],
      dob:['', Validators.required],
      address:['', Validators.required],
    })
  }

  postTeacher(){
    // console.log(this.validateForm.value);

    this.adminService.addTeacher(this.validateForm.value).subscribe((res)=>{
      // this.isSpinning = true;
      if(res.id != null){
        this.snackBar.open("Teacher Added successfully", "Close", {duration:5000})
      } else{
        this.snackBar.open("Something Went wrong", "Close", {duration:5000})
      }
    })
    
  }

}
