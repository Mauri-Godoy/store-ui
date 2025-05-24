import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Eye, EyeOff, LucideAngularModule } from 'lucide-angular';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, LucideAngularModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  form: FormGroup = new FormGroup({});
  readonly Eye = Eye;
  readonly EyeOff = EyeOff;
  showPassword = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private location: Location
  ) {
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
        this.goBack();
      }
    });
  }

  goBack() {
    const currentUrl = window.location.href;
    const previousUrl = document.referrer;

    // Verifica si la URL anterior es del mismo dominio
    if (previousUrl && new URL(previousUrl).origin === new URL(currentUrl).origin) {
      this.location.back();
    } else {
      // Si no es del mismo dominio, navega a home
      this.router.navigate(['/home']);
    }
  }
}
