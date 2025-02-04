import { Component, OnInit } from '@angular/core';
import { Prediction } from '../../models/prediction';
import { PredictionServiceService } from '../../services/prediction-service.service';
import { Patient } from '../../models/patient';

@Component({
  selector: 'app-show-predict',
  standalone: false,
  
  templateUrl: './show-predict.component.html',
  styleUrl: './show-predict.component.css'
})
export class ShowPredictComponent implements OnInit{

  prediction: Prediction | null = null;
  patient: Patient | null = null;  // Nueva variable para almacenar los datos del paciente

  constructor(private predictionService: PredictionServiceService) {}

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
