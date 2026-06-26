import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = () => {
  const token = localStorage.getItem('kc_token');
  const router = inject(Router);

  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};