import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../../student-service/student.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.component.html',
  styleUrl: './update-student.component.css'
})
export class UpdateStudentComponent {

  CLASS:string[]= [
    "play", "1st","2nd","3rd","4th","5th","6th","7th","8th","9th","10th","11th","12th"
  ];
  GENDER:string[]=[
    "Male", "Female", "Others"
  ]

  student:any
  isSpinning = false
  validateForm:FormGroup;

  constructor(
    private fb:FormBuilder,
    private service:StudentService,
    private snackBar:MatSnackBar,
  ){}

  ngOnInit(){
    this.validateForm = this.fb.group({
          email:['', Validators.required],
          name:['', Validators.required],
          fatherName:['', Validators.required],
          motherName:['', Validators.required],
          studentClass:['', Validators.required],
          dob:['', Validators.required],
          address:['', Validators.required],
          gender:['', Validators.required],
    });
    this.getStudentById();
  }


  getStudentById(){
    this.service.getStudentById().subscribe((res)=>{
      const student = res.studentDto;
      this.validateForm.patchValue(student)
    })
  }

  updateStudent(){
    this.isSpinning = true;
    this.service.updateStudent(this.validateForm.value).subscribe((res)=>{
      console.log(res);
      this.isSpinning = false;
      if(res.id != null){
        this.snackBar.open("Updated successfully", "Close", {duration:5000});
        this.getStudentById();
      }else{
        this.snackBar.open("Student Not found", "Close", {duration:5000});
      }
    });
  }

}
