import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedIn: boolean = false;
  role: string | null = null;
  constructor(private router: Router, private http: HttpClient) {}
  logIn(username: string, password: string) {
    return new Promise((resolve) => {
      const index = CredentialMapping.find(
        (t) => t.username === username && t.password === password
      );
      if (index) {
        this.loggedIn = true;
        this.role = index.role;
        resolve(true);
      } else {
        resolve(false);
      }
    });
  }

  logOut() {
    this.router.navigate(['/home']);
    return new Promise((resolve) => {
      setTimeout(() => {
        this.loggedIn = false;
        this.role = null;
        resolve(false);
      }, 0);
    });
  }

  getUserPosts():Observable<any> {
    return this.http.get('https://jsonplaceholder.typicode.com/posts', {
      observe: 'body',
    });
  }
}

const CredentialMapping = [
  { username: 'sunnykewat99', password: 'sunnykewat99', role: 'user' },
  { username: 'sunnykewat31', password: 'sunnykewat31', role: 'user' },
  { username: 'admin', password: 'admin', role: 'admin' },
];
