import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  form: FormGroup = new FormGroup({});
  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) {
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      email: [''],
      username: [''],
      password: ['']
    });
  }

  register() {
    const user: User = this.form.value;
    this.authService.register(user).subscribe({
      next: (response) => {
        console.log('Register successful', response);
        this.router.navigate(['/home']);
      }
    });
  }
}
