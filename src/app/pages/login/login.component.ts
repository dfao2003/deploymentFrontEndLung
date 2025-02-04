import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Doctor } from '../../models/doctor';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: false,
  
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // Inicializar el formulario en el constructor
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const email = this.loginForm.value.email;

    // Llama al servicio de autenticación
    this.authService.login(email).pipe(
      catchError((error) => {
        // Si ocurre un error, muestra el mensaje adecuado
        this.errorMessage = 'Email o contraseña incorrectos';
        return of(null);  // Se devuelve null para continuar con la ejecución
      })
    ).subscribe(response => {
      if (response) {
        // Si la respuesta es válida (login exitoso), redirige a otra página
        this.router.navigate(['/patients']);  // Cambia a la ruta que desees
      }
    });
  }

}
