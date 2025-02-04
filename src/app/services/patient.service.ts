import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../../enviroments/enviroment';
import { Patient } from '../models/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http:HttpClient) { }

  savePatient(patient:Patient):Observable<any>{
    let url = enviroment.WS_PATH+'/patients/'
    return this.http.post<any>(url,patient);
  }

  getPatients(): Observable<Patient[]>{
    let url = enviroment.WS_PATH+'/patients/'
    return this.http.get<Patient[]>(url);
  }

}
