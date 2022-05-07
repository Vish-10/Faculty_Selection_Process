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
import { ModifyUsernamePasswordComponent } from './modify-username-password/modify-username-password.component';
import { DocManageSlotsComponent } from './doc-manage-slots/doc-manage-slots.component';
import { BookslotChoiceComponent } from './bookslot-choice/bookslot-choice.component';

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
    AppliedJobsComponent,
    ModifyUsernamePasswordComponent,
    DocManageSlotsComponent,
    BookslotChoiceComponent
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
