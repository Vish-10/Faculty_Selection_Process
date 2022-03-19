import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { JobDescriptionComponent } from './job-description/job-description.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { AddJobComponent } from './add-job/add-job.component';
import { AppliedJobsComponent } from './applied-jobs/applied-jobs.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomePageComponent,
    NavbarComponent,
    JobDescriptionComponent,
    ProfilePageComponent,
    AddJobComponent,
    AppliedJobsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
