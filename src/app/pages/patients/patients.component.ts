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
  filteredPatients: Patient[] = [];
  searchText: string = '';

  constructor(private patientService: PatientService){

  }

  ngOnInit(): void {
    this.patientService.getPatients().subscribe((data: Patient[]) => {
      this.patients = data;
      this.filteredPatients = data; // Inicialmente, todos los pacientes se muestran
    });
  }

  filterPatients(): void {
    const search = this.searchText.toLowerCase();
    this.filteredPatients = this.patients.filter(patient =>
      (patient.name ?? '').toLowerCase().includes(search) ||
      (patient.last_name ?? '').toLowerCase().includes(search) ||
      (patient.identification !== undefined ? patient.identification.toString() : '').includes(this.searchText)
    );
  }

  clearSearch(): void {
    this.searchText = '';
    this.filteredPatients = this.patients;
  }

}
