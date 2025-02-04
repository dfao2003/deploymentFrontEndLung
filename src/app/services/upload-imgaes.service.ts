import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class UploadImgaesService {

  constructor(private http: HttpClient) {}

  // Método para subir las imágenes al backend
  uploadImages(id_patient: number, id_doctor: number, files: File[]): Observable<any> {
    const formData = new FormData();

    // Añadir datos al FormData
    formData.append('patient_id', id_patient.toString());
    formData.append('doctor_id', id_doctor.toString());

    // Añadir todas las imágenes
    files.forEach(file => {
      formData.append('images', file, file.name);
    });

    // URL corregida
    const url = `${enviroment.WS_PATH}/cfc/`; // Ajusta la ruta según corresponda

    // Llamada HTTP POST
    return this.http.post(url, formData);
  }

}
