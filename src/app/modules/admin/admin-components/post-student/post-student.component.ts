import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../admin-service/admin.service';
import { error } from 'console';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-post-student',
  templateUrl: './post-student.component.html',
  styleUrl: './post-student.component.css'
})
export class PostStudentComponent {


  CLASS:string[]=[
    "play", "1st","2nd","3rd","4th","5th","6th","7th","8th","9th","10th","11th","12th"
  ];
  GENDER:string[]= [
    "Male", "Female","Others"
  ];
  
  isSpinning:boolean
  validateForm:FormGroup
  

  constructor(
    private service: AdminService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
   
  ){}


  ngOnInit():void{
    this.validateForm = this.fb.group({
      email:['', Validators.required],
      name:['', Validators.required],
      password:['', Validators.required],
      checkPassword:['',[Validators.required, this.confirmationValidator]],
      fatherName:['', Validators.required],
      motherName:['', Validators.required],
      studentClass:['', Validators.required],
      dob:['', Validators.required],
      address:['', Validators.required],
      gender:['', Validators.required],
    })
  }

  // check password & confirm password are same or not
  confirmationValidator = (control: FormControl): {[s:string]:boolean}=> {
    if(!control.value){
      return {require: true};
    } else if(control.value !== this.validateForm.controls["password"].value){
      return {confirm:true, error:true}
    }
    return {};
  }

  postStudent(){
    console.log(this.validateForm.value);
    //isSpinning => submit data into backend
    this.isSpinning = true;
    this.service.addStudent(this.validateForm.value).subscribe((res)=>{

      this.isSpinning= false;
      
      if(res.id != null){
        this.snackBar.open("Student Posted successfully", "close", {duration:5000})
      }else{
        this.snackBar.open("Student already created", "close", {duration:5000})
      }
      // console.log(res);
      
    })
    
  }

}
