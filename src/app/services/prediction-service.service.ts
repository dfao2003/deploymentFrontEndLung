import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Prediction } from '../models/prediction';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { enviroment } from '../../enviroments/enviroment';
import { Patient } from '../models/patient';

@Injectable({
  providedIn: 'root'
})
export class PredictionServiceService {

  private predictionSource = new BehaviorSubject<Prediction | null>(null);
  currentPrediction = this.predictionSource.asObservable();

  constructor(private http: HttpClient) { }

  // Método para guardar la predicción
  savePrediction(prediction: Prediction): Observable<any> {
    const url = enviroment.WS_PATH + '/predictions/';
    return this.http.post(url, prediction).pipe(
      // Una vez guardada la predicción, la actualizamos en el BehaviorSubject
      tap(response => {
        // Aquí se asume que la predicción se guarda correctamente
        this.predictionSource.next(prediction);
      })
    );
  }

  // Método para obtener la predicción actual
  getCurrentPrediction(): Observable<Prediction | null> {
    return this.currentPrediction;
  }

  getPatientById(patientId: number): Observable<Patient> {
    const url = `${enviroment.WS_PATH}/patients/`;  // Asegúrate de que `environment.WS_PATH` esté bien configurado
    return this.http.get<Patient>(`${url}${patientId}`); // Concatenamos la URL base con el `patientId`
  }
}
