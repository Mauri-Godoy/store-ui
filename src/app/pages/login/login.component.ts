import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../models/user.model';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LucideAngularModule, Eye, EyeOff } from 'lucide-angular';

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
