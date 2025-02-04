import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../enviroments/enviroment';
import { catchError, Observable } from 'rxjs';
import { Doctor } from '../models/doctor';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  login(email: string): Observable<any> {
    const url = `${enviroment.WS_PATH}/doctors/email/`;
    return this.http.get(`${url}${email}/`);
  }

}
