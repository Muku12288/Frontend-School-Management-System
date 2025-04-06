import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './modules/admin/admin-components/dashboard/dashboard.component';
import { noAuthGuard } from './auth/guards/noAuth-guard/no-auth.guard';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  //routing of login component from login
  {path:"login", component:LoginComponent, canActivate: [noAuthGuard]},
  {path:"home", component:HomeComponent, canActivate: [noAuthGuard]},
  //routing of admin module from admin module component 
  {path:"admin", loadChildren: ()=> import("./modules/admin/admin.module").then(m => m.AdminModule)},
  //routing of student module from student module 
  {path:"student", loadChildren: ()=> import("./modules/student/student.module").then(m => m.StudentModule)}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
