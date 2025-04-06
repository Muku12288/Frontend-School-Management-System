import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './admin-components/dashboard/dashboard.component';
import { AdminGuard } from '../../auth/guards/admin-guard/admin.guard';
import { PostStudentComponent } from './admin-components/post-student/post-student.component';
import { AllStudentsComponent } from './admin-components/all-students/all-students.component';
import { UpdateStudentComponent } from './admin-components/update-student/update-student.component';
import { AllLeavesComponent } from './admin-components/all-leaves/all-leaves.component';
import { PostTeacherComponent } from './admin-components/post-teacher/post-teacher.component';
import { AllTeachersComponent } from './admin-components/all-teachers/all-teachers.component';
import { UpdateTeacherComponent } from './admin-components/update-teacher/update-teacher.component';

const routes: Routes = [
  //routing of admin dashboard component from admin-component
  //when we hit admin/dashboard url then it first come admin routing file and then it parallaly check
  // through "canActivate:[AdminGuard]" that if student was login or not.| remaining logic is in AdminGuard.ts 
  {path:"dashboard", component:DashboardComponent, canActivate:[AdminGuard]},
  {path:"student", component: PostStudentComponent, canActivate:[AdminGuard]},
  {path:"leaves", component: AllLeavesComponent, canActivate:[AdminGuard]},
  {path:"students", component: AllStudentsComponent},
  {path:"student/:studentId", component: UpdateStudentComponent},
  {path:"teacher", component: PostTeacherComponent},
  {path:"teachers", component: AllTeachersComponent},
  {path:"teacher/:teacherId", component: UpdateTeacherComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
