import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  loggedIn: boolean = false;
  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.loggedIn = this.auth.loggedIn;
  }

  logIn() {
    this.auth.logIn().then((res: any) => {
      this.loggedIn = res;
    });
  }

  logOut() {
    this.auth.logOut().then((res: any) => {
      this.loggedIn = res;
    });
  }
}
