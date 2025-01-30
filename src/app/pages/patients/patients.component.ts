import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../models/patient';

@Component({
  selector: 'app-patients',
  standalone: false,
  
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.css'
})
export class PatientsComponent implements OnInit{

  patients: Patient[] = [];

  constructor(private patientService: PatientService){

  }

  ngOnInit(): void {
    this.patientService.getPatients().subscribe((data: Patient[]) => {
      this.patients = data;
      console.log(this.patients)
    });
  }

}
