import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../enviroments/enviroment';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { PatientImageReport } from '../models/patient-image-report';
import { Patient } from '../models/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientimagereportsService {

  private predictionSource = new BehaviorSubject<PatientImageReport | null>(null);
  currentPrediction = this.predictionSource.asObservable();

  constructor(private http: HttpClient) {}

  uploadImages(id_patient: number, files: File[]): Observable<any> {
      const formData = new FormData();
  
      // Añadir datos al FormData
      formData.append('patient_id', id_patient.toString());
  
      // Añadir todas las imágenes
      files.forEach(file => {
        formData.append('images', file, file.name);
      });
  
      // URL corregida
      const url = `${enviroment.WS_PATH}/heats/`; // Ajusta la ruta según corresponda
  
      // Llamada HTTP POST
      return this.http.post(url, formData);
    }

    getCurrentPrediction(): Observable<PatientImageReport | null> {
      return this.currentPrediction;
    }
  
    getPatientById(patientId: number): Observable<Patient> {
      const url = `${enviroment.WS_PATH}/patients/`;  // Asegúrate de que `environment.WS_PATH` esté bien configurado
      return this.http.get<Patient>(`${url}${patientId}`); // Concatenamos la URL base con el `patientId`
    }
}
