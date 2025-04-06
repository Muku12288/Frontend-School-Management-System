import { Component } from '@angular/core';
import { AdminService } from '../../admin-service/admin.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-teacher',
  templateUrl: './update-teacher.component.html',
  styleUrl: './update-teacher.component.css'
})
export class UpdateTeacherComponent {
  DEPARTMENT:string[]= [
    "CSE", "ECE", "EE", "IT", "ME", "CE", "BCA", "MCA", "Civil"
  ];
  GENDER:string[]= [
    "Male", "Female", "Others"
  ]


  validateForm: FormGroup;
  teacherId:number = this.activatedRoute.snapshot.params['teacherId']
  isSpinning:boolean = false;

  constructor(
    private service: AdminService,
    private activatedRoute: ActivatedRoute,
    private snackBar:MatSnackBar,
    private fb:FormBuilder
  ){}

  ngOnInit(){
    this.getTeacherById();
    this.validateForm = this.fb.group({
      name:['', Validators.required],
      gender:['', Validators.required],
      department:['', Validators.required],
      qualification:['', Validators.required],
      dob:['', Validators.required],
      address:['', Validators.required],

    })
  }

  getTeacherById(){
    this.service.getTeacherById(this.teacherId).subscribe((res)=>{
      console.log(res)
      const teacher = res.teacherDto;
      this.validateForm.patchValue(teacher)
    })
  }

  updateTeacher(){
    this.service.updateTeacher(this.teacherId, this.validateForm.value).subscribe((res)=>{
      if(res.id != null){
        this.snackBar.open("Teacher Details Updated successfully", "Close", {duration:5000});
        
      }else{
        this.snackBar.open("Teacher not found", "Close", {duration:5000})
    }
      
    })
  }
}
