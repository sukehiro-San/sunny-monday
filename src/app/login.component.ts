import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  template: `
    <input
      type="text"
      placeholder="Username"
      [(ngModel)]="username"
      name="username"
    />
    <input
      type="password"
      placeholder="password"
      [(ngModel)]="password"
      name="password"
    />
    <button (click)="logIn()">Login</button>
  `,
  styleUrls: [],
})
export class LoginComponent {
  constructor(private auth: AuthService, private router: Router) {}
  username: string | null = null;
  password: string | null = null;

  logIn() {
    if (this.username && this.password) {
      this.auth.logIn(this.username, this.password).then((res) => {
        console.log(res);
        if (res) {
          this.router.navigate(['/dashboard']);
        }
      });
    }
  }
}
