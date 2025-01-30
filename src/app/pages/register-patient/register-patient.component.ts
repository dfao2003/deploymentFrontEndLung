import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatientService } from '../../services/patient.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-patient',
  standalone: false,
  
  templateUrl: './register-patient.component.html',
  styleUrl: './register-patient.component.css'
})

export class RegisterPatientComponent implements OnInit{

  patientForm: FormGroup;
  patients: any[] = [];

  constructor(private fb: FormBuilder, private patientService: PatientService, private router: Router){
    this.patientForm = this.fb.group({
      identification: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      name: ['',[Validators.required, Validators.maxLength(50)]],
      last_name: ['',[Validators.required, Validators.maxLength(50)]],
      sex:['',[Validators.required]],
      birthday: ['',[Validators.required]],
    });
  }

  ngOnInit(): void {
    
  }

  AddPatient():void {
    console.log(this.patientForm.value); // Muestra los datos enviados al backend

    if(this.patientForm.valid){
      this.patientService.savePatient(this.patientForm.value).subscribe(
        response => {
          console.log("Paciente enviado: ", response)
          this.router.navigate(['/patients']);
        }
      )
    }
  }

  isFieldInvalid(field: string): boolean{
    const control = this.patientForm.get(field);
    return control ? control.invalid && control.touched : false
  }
}

