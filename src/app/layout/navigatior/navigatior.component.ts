import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from 'src/services/authorization/authorization.service';

@Component({
  selector: 'app-navigatior',
  templateUrl: './navigatior.component.html',
  styleUrls: ['./navigatior.component.css']
})
export class NavigatiorComponent {
  constructor (
    private readonly router: Router,
    private readonly _authorizationService: AuthorizationService
  ) {

  }

  logout() {

    this._authorizationService.logout();
  }
}
