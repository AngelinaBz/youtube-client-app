import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { first, map } from 'rxjs';

import { LoginService } from '../../../auth/services/login/login.service';

export const authGuard: CanActivateFn = () => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  return loginService.isLoggedIn$.pipe(
    first(),
    map((isLoggedIn) => {
      if (isLoggedIn) {
        return true;
      }
      return router.createUrlTree(['/login']);
    }),
  );
};
