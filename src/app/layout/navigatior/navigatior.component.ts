import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigatior',
  templateUrl: './navigatior.component.html',
  styleUrls: ['./navigatior.component.css']
})
export class NavigatiorComponent {
  constructor (
    private readonly router: Router
  ) {

  }

  logout() {

    localStorage.removeItem("auth_app_token");
    this.router.navigateByUrl("authorization/login");
  }
}
