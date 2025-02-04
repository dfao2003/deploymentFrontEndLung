import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { ShowPredictComponent } from './pages/show-predict/show-predict.component';
import { RegisterPatientComponent } from './pages/register-patient/register-patient.component';
import { UploadImagesComponent } from './pages/upload-images/upload-images.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardMedicComponent } from './pages/dashboard-medic/dashboard-medic.component';
import { PatientsComponent } from './pages/patients/patients.component';
import { UploadImagesCancerComponent } from './pages/upload-images-cancer/upload-images-cancer.component';
import { ShowImagesCancerComponent } from './pages/show-images-cancer/show-images-cancer.component';

const routes: Routes = [
    { path: '', redirectTo: 'welcome', pathMatch: 'full' }, // Redirige '/' a '/inicio'
    { path: 'welcome', component: WelcomeComponent },
    { path: 'show_predict', component: ShowPredictComponent},
    { path: 'register_patient', component: RegisterPatientComponent},
    { path: 'upload_images', component: UploadImagesComponent},
    { path: 'login', component: LoginComponent},
    { path: 'dashboardMedic', component: DashboardMedicComponent},
    { path: 'patients', component: PatientsComponent},
    { path: 'upload_images_cancer', component: UploadImagesCancerComponent},
    { path: 'show_images_cancer', component: ShowImagesCancerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
