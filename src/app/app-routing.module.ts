import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomePageComponent } from './home-page/home-page.component'; 
import { JobDescriptionComponent } from './job-description/job-description.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { AddJobComponent } from './add-job/add-job.component';
import { AppliedJobsComponent } from './applied-jobs/applied-jobs.component';
import { ModifyUsernamePasswordComponent } from './modify-username-password/modify-username-password.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent}, 
  {path: 'home-page', component: HomePageComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {path: 'job-description', component: JobDescriptionComponent},
  {path: 'profile', component: ProfilePageComponent},
  {path: 'addJob', component: AddJobComponent},
  {path: 'appliedJobs', component:AppliedJobsComponent},
  {path: 'modify', component:ModifyUsernamePasswordComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
}
