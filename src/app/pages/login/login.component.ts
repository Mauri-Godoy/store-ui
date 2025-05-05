import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../models/user.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  form: FormGroup = new FormGroup({});
  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) {
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      username: [''],
      password: ['']
    });
  }

  login() {
    const user: User = this.form.value;
    this.authService.login(user).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        this.authService.setToken(response.token);
        this.authService.setUser(response.user);
        this.router.navigate(['/home']);
      }
    });
  }
}
