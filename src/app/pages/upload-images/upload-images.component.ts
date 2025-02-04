import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatientService } from '../../services/patient.service';
import { Router } from '@angular/router';
import { Patient } from '../../models/patient';
import { UploadImgaesService } from '../../services/upload-imgaes.service';
import { Prediction } from '../../models/prediction';
import { PredictionServiceService } from '../../services/prediction-service.service';

@Component({
  selector: 'app-upload-images',
  standalone: false,
  
  templateUrl: './upload-images.component.html',
  styleUrl: './upload-images.component.css'
})
export class UploadImagesComponent implements OnInit{
  uploadForm: FormGroup;
  patients: any[] = [];
  selectedPatient: any = null;
  selectedFiles: File[] = [];
  isDragging = false;
  isLoading = false; 
  prediction: Prediction = new Prediction();

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    private imageUploadService: UploadImgaesService,  // Inyecta el servicio
    private predictionService: PredictionServiceService,
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
  
    if (this.selectedFiles.length < 50) {
      alert('Debe seleccionar al menos 50 imágenes');
      return;
    }
  
    this.isLoading = true;
  
    this.imageUploadService.uploadImages(this.selectedPatient.id, 1 ,this.selectedFiles).subscribe(
      (response: any) => {
        console.log('Resultado:', response);
  
        // Extraer solo el contenido de la respuesta 'openai_explanation'
        const openaiExplanation = response.openai_explanation;  
        // Creamos la predicción solo con el `id`
        this.prediction = {
          class_predict: response.predicted_class, // Se asigna el valor correcto
          prediagnostic_report: openaiExplanation, // Solo se guarda el 'content'
          doctor: 1, // Asegurar que sea un ID válido
          patient: this.selectedPatient?.id ?? null // Solo se guarda el `id`
        };
  
        console.log('Enviando predicción:', this.prediction);
  
        // Guardamos la predicción
        this.predictionService.savePrediction(this.prediction).subscribe(
          () => {
            this.isLoading = false;
            alert('Predicción guardada correctamente');
            this.router.navigate(['/show_predict']);
          },
          (error) => {
            this.isLoading = false;
            console.error('Error al guardar la predicción:', error);
            alert('Error al guardar la predicción');
          }
        );
      },
      (error) => {
        this.isLoading = false;
        console.error('Error al subir imágenes:', error);
        alert('Error al generar el reporte');
      }
    );
  }
}
