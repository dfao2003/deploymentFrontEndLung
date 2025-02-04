import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatientImageReport } from '../../models/patient-image-report';
import { PatientService } from '../../services/patient.service';
import { Router } from '@angular/router';
import { PatientimagereportsService } from '../../services/patientimagereports.service';

@Component({
  selector: 'app-upload-images-cancer',
  standalone: false,
  
  templateUrl: './upload-images-cancer.component.html',
  styleUrl: './upload-images-cancer.component.css'
})
export class UploadImagesCancerComponent {
    uploadForm: FormGroup;
    patients: any[] = [];
    selectedPatient: any = null;
    selectedFiles: File[] = [];
    isDragging = false;
    isLoading = false; 
    prediction: PatientImageReport = new PatientImageReport();
  
    constructor(
      private fb: FormBuilder,
      private patientService: PatientService,
      private patientImageReportService: PatientimagereportsService,  // Inyecta el servicio
      private router: Router
    ) {
      this.uploadForm = this.fb.group({
        patient: ['', Validators.required]
      });
    }
  
    ngOnInit(): void {
      this.patientService.getPatients().subscribe((data: any[]) => {
        this.patients = data;
      });
    }
  
    onSelectPatient(event: Event) {
      const patientId = (event.target as HTMLSelectElement).value;
      this.selectedPatient = this.patients.find(p => p.identification.toString() === patientId) || null;
    }
  
    triggerFileInput() {
      const fileInput = document.getElementById('fileInput') as HTMLInputElement;
      fileInput.click();
    }
  
    onFileSelect(event: Event) {
      const input = event.target as HTMLInputElement;
      if (input.files) {
        this.selectedFiles = Array.from(input.files);
      }
    }
  
    onDragOver(event: DragEvent) {
      event.preventDefault();
      this.isDragging = true;
    }
  
    onDragLeave(event: DragEvent) {
      event.preventDefault();
      this.isDragging = false;
    }
  
    onDrop(event: DragEvent) {
      event.preventDefault();
      this.isDragging = false;
  
      if (event.dataTransfer?.files) {
        this.selectedFiles = Array.from(event.dataTransfer.files).filter(file => file.type.startsWith('image/'));
      }
    }

  uploadImages() {
    if (!this.selectedPatient) {
      alert('Debe seleccionar un paciente');
      return;
    }
  
    if (this.selectedFiles.length < 2) {
      alert('Debe seleccionar al menos 2 imágenes');
      return;
    }
  
    this.isLoading = true;
  
    this.patientImageReportService.uploadImages(this.selectedPatient.id ,this.selectedFiles).subscribe(
      (response: any) => {
        console.log('Resultado:', response);
  
        // Extraer solo el contenido de la respuesta 'openai_explanation'
        const openaiExplanation = response.report; 
        const image1_base64 = response.image1_base64;
        console.log(image1_base64);
        const image2_base64 = response.image1_base64;
        console.log(image2_base64);

        // Creamos la predicción solo con el `id`
        this.prediction = {
          image_1: image1_base64,
          image_2: image2_base64,
          report: openaiExplanation, // Solo se guarda el 'content'
          patient: this.selectedPatient?.id ?? null // Solo se guarda el `id`
        };
  
        console.log('Enviando predicción:', this.prediction);

      },
      (error) => {
        this.isLoading = false;
        console.error('Error al subir imágenes:', error);
        alert('Error al generar el reporte');
      }
    );
  }

}
