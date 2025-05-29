import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Eye, EyeOff, LucideAngularModule } from 'lucide-angular';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, LucideAngularModule, RouterModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  readonly Eye = Eye;
  readonly EyeOff = EyeOff;
  showPassword = false;
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
        this.router.navigate(['/login']);
      }
    });
  }
}
