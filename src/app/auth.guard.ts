// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private cookieService: CookieService
  ) {}

  canActivate(): boolean {
    const accessToken = this.cookieService.get('accessToken');

    if (accessToken) {
      // User is logged in, allow access to the dashboard
      return true;
    } else {
      // User is not logged in, redirect to the login page
      this.router.navigate(['/login']);
      return false;
    }
  }
}
