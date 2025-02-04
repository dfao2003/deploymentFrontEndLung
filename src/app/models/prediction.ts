export class Prediction {
    class_predict: string;
    prediagnostic_report: string;
    doctor: number;
    patient: number | null;
  
    constructor(class_predict: string = '', prediagnostic_report: string = '', doctor_id: number = 1, patient_id: number | null = null) {
      this.class_predict = class_predict;
      this.prediagnostic_report = prediagnostic_report;
      this.doctor = doctor_id;
      this.patient = patient_id;
    }
}