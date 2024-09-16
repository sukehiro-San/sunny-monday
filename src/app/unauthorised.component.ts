import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unauthorised',
  template: ` <h3>401 Unauthorised! redirecting to /login...</h3> `,
  styleUrls: [],
})
export class UnauthorisedComponent implements OnInit {
  constructor(private router: Router) {}
  ngOnInit(): void {
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 2000);
  }
}
