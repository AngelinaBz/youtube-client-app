import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators
} from '@angular/forms';
import { Router } from '@angular/router';

import { ButtonComponent } from '../../../shared/components/button/button.component';
import { LoginService } from '../../services/login/login.service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ButtonComponent],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.passwordValidator]],
    });
  }

  passwordValidator(control: AbstractControl) {
    const password: string = control.value;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#?$%^&*]/.test(password);
    const validLength = password && password.length >= 8;

    if (!validLength) {
      return { weakPassword: 'Your password must be at least 8 characters long' };
    }
    if (!hasUpperCase || !hasLowerCase || !hasNumbers || !hasSpecialChars) {
      return {
        weakPassword: `Your password isn't strong enough.
      Password must contain at least one uppercase letter, lowercase letter, number, a special character.`,
      };
    }
    return null;
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get isValid() {
    return this.loginForm.valid;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.loginService.login(username, password);
      this.router.navigate(['/main']);
    }
  }
}
