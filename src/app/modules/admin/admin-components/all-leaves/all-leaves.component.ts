import { Component } from '@angular/core';
import { AdminService } from '../../admin-service/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-all-leaves',
  templateUrl: './all-leaves.component.html',
  styleUrl: './all-leaves.component.css'
})
export class AllLeavesComponent {

    isSpinning = false;
    leaves:any
  
    constructor(
      private adminService: AdminService,
      private snackBar: MatSnackBar
    ){}
  
  
    ngOnInit(){
      this.getAllLeaves();
    }
  
    getAllLeaves(){
      this.isSpinning = true
      this.adminService.getAllAppliedLeaves().subscribe((res)=>{
        // console.log(res);
        
        this.isSpinning = false
        this.leaves = res
      })
    }

    changeLeaveStatus(leaveId:number, status: string){
      this.isSpinning = true
      this.adminService.changeLeaveStatus(leaveId, status).subscribe((res)=>{
        // console.log(res);
        this.isSpinning= false;
        if(res.id != null){
          this.snackBar.open("Leave Status Updated Successfully", "Close",{duration:5000});
          // call this method because when we update the status simulteniously change the status in the UI.
          this.getAllLeaves();
        } else{
          this.snackBar.open("Something went wrong", "ERROR", {duration:5000});
        }
        
      })
    }

}
