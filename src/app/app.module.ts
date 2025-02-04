import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { FooterComponent } from './pages/footer/footer.component';
import { RegisterPatientComponent } from './pages/register-patient/register-patient.component';
import { ShowPredictComponent } from './pages/show-predict/show-predict.component';
import { UploadImagesComponent } from './pages/upload-images/upload-images.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './pages/login/login.component';
import { DashboardMedicComponent } from './pages/dashboard-medic/dashboard-medic.component';
import { Navbar2Component } from './pages/navbar2/navbar2.component';
import { PatientsComponent } from './pages/patients/patients.component';
import { MarkdownModule } from 'ngx-markdown';
import { UploadImagesCancerComponent } from './pages/upload-images-cancer/upload-images-cancer.component';
import { ShowImagesCancerComponent } from './pages/show-images-cancer/show-images-cancer.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    NavbarComponent,
    FooterComponent,
    RegisterPatientComponent,
    ShowPredictComponent,
    UploadImagesComponent,
    LoginComponent,
    DashboardMedicComponent,
    Navbar2Component,
    PatientsComponent,
    UploadImagesCancerComponent,
    ShowImagesCancerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MarkdownModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
