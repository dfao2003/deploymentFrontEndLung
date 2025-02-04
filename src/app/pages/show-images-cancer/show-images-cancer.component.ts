import { Component } from '@angular/core';
import { PatientImageReport } from '../../models/patient-image-report';
import { Patient } from '../../models/patient';
import { PatientimagereportsService } from '../../services/patientimagereports.service';

@Component({
  selector: 'app-show-images-cancer',
  standalone: false,
  
  templateUrl: './show-images-cancer.component.html',
  styleUrl: './show-images-cancer.component.css'
})
export class ShowImagesCancerComponent {

    prediction: PatientImageReport | null = null;
    patient: Patient | null = null;  // Nueva variable para almacenar los datos del paciente
  
    constructor(private predictionService: PatientimagereportsService) {}
  
    ngOnInit() {
      this.predictionService.currentPrediction.subscribe(prediction => {
        this.prediction = prediction;
  
        // Si hay un paciente en la predicción, obtener sus datos
        if (prediction?.patient) {
          this.predictionService.getPatientById(prediction.patient).subscribe(patient => {
            this.patient = patient;
          });
        }
      });
    }

}
