import { Component, ViewChild } from '@angular/core';
import { AdminService } from '../../admin-service/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Leave } from '../../leave';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-all-leaves',
  templateUrl: './all-leaves.component.html',
  styleUrl: './all-leaves.component.css'
})
export class AllLeavesComponent {

  isSpinning = false;
  leaves: Leave[] = []
  filterLeave: Leave[] = []
  @ViewChild(MatPaginator) paginator: any;

  constructor(
    private adminService: AdminService,
    private snackBar: MatSnackBar
  ) { }

  displayedColumns: string[] = ['id', 'name', 'studentClass', 'date', 'subject', 'body', 'studentLeaveStatus', 'action']
  dataSource = new MatTableDataSource<Leave>();

  ngOnInit() {
    this.getAllLeaves();
  }

  getAllLeaves() {
    this.isSpinning = true
    this.adminService.getAllAppliedLeaves().subscribe((res) => {
      // console.log(res);

      this.isSpinning = false
      this.leaves = res;
      this.dataSource.data = res;
      this.dataSource = new MatTableDataSource<Leave>(res)
      this.dataSource.paginator = this.paginator; //pagination

    })
  }

  changeLeaveStatus(leaveId: number, status: string) {
    this.isSpinning = true
    this.adminService.changeLeaveStatus(leaveId, status).subscribe((res) => {
      // console.log(res);
      this.isSpinning = false;
      if (res.id != null) {
        this.snackBar.open("Leave Status Updated Successfully", "Close", { duration: 5000 });
        // call this method because when we update the status simulteniously change the status in the UI.
        this.getAllLeaves();
      } else {
        this.snackBar.open("Something went wrong", "ERROR", { duration: 5000 });
      }

    })
  }

  searchLeave(input: any) {
    this.filterLeave = this.leaves.filter(items => items.userid.toString().includes(input)
      || items.name.toLowerCase().includes(input.toLowerCase())
      // || items.id.toString().includes(input)
    )
    this.dataSource = new MatTableDataSource<Leave>(this.filterLeave)
  }

}
