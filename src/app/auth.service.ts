import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedIn: boolean = false;
  constructor(private router: Router) {}
  logIn() {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.loggedIn = true;
        resolve(true);
      }, 0);
    });
  }

  logOut() {
    this.router.navigate(['/home']);
    return new Promise((resolve) => {
      setTimeout(() => {
        this.loggedIn = false;
        resolve(false);
      }, 0);
    });
  }
}
