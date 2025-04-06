import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../../student-service/student.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-apply-leave',
  templateUrl: './apply-leave.component.html',
  styleUrl: './apply-leave.component.css'
})
export class ApplyLeaveComponent {

  isSpinning = false;
  validateForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private snackBar: MatSnackBar,
    private router: Router
  ){}


  ngOnInit():void{
    this.validateForm = this.fb.group({
      subject: [null, [Validators.required]],
      body: [null, [Validators.required]]
    });
   
  }

  applyLeave(){
    this.isSpinning = true;
    this.studentService.applyLeave(this.validateForm.value).subscribe((res)=>{
      console.log(res);
      this.isSpinning = false;
      
      if(res.id != null){
        this.snackBar.open("Leave Applied successfully", "SUCCESS", {duration:5000});
        this.router.navigateByUrl('student/dashboard');
      } else{
        this.snackBar.open("Something Went wrong", "ERROR", {duration:5000})
      }
    })

  }

}
