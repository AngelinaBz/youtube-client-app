import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';

import { LoginService } from '../../../../auth/services/login/login.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  isLoggedIn$: Observable<boolean>;
  username$: Observable<string | null>;

  constructor(
    private loginService: LoginService,
    private router: Router,
  ) {
    this.isLoggedIn$ = this.loginService.isLoggedIn$;
    this.username$ = this.loginService.username$;
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}
