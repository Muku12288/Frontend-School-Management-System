import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './student-components/dashboard/dashboard.component';
import { StudentGuard } from '../../auth/guards/student-guard/student.guard';
import { ApplyLeaveComponent } from './student-components/apply-leave/apply-leave.component';
import { GetAllLeavesComponent } from './student-components/get-all-leaves/get-all-leaves.component';
import { UpdateStudentComponent } from './student-components/update-student/update-student.component';

const routes: Routes = [
  //when we hit student/dashboard url then it parallaly check
  //  through "canActivate:[StudentGuard]" that if admin was login or not.| remaining logic is in StudentGuard.ts
  //routing of student dashboard component from student-component 
  {path:"dashboard", component:DashboardComponent, canActivate:[StudentGuard]},
  {path:"leave", component:ApplyLeaveComponent, canActivate:[StudentGuard]},
  {path:"leaves", component:GetAllLeavesComponent, canActivate:[StudentGuard]},
  {path:"update", component:UpdateStudentComponent, canActivate:[StudentGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
