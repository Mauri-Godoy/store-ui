import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  form: FormGroup = new FormGroup({});
  constructor(private authService: AuthService, private formBuilder: FormBuilder) {
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      email: [''],
      username: [''],
      password: ['']
    });
  }

  login() {
    const user: User = this.form.value;
    this.authService.login(user).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        // Handle successful login, e.g., redirect to another page or show a success message
      }
    });
  }
}
