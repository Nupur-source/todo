import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user = {
    email: '',
    password: ''
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService,
    private snackBar: MatSnackBar
  ) {}

  onSubmit() {
    const apiUrl = 'https://seashell-app-2hkku.ondigitalocean.app/api/auth/signin';

    this.http.post(apiUrl, this.user).subscribe(
      (response: any) => {
        if (response) {
          console.log('Login successful:', response);
          this.cookieService.set('user_id', response.id);
          this.cookieService.set('user_name', response.username);
          this.cookieService.set('accessToken', response.accessToken);
          console.log(response.accessToken);
          this.router.navigate(['/dashboard']);

          // Display success message using MatSnackBar
          this.snackBar.open('Login successful', 'Close', { duration: 3000 });
        }
      },
      (error) => {
        console.error('Login failed:', error);

        // Display error message using MatSnackBar
        this.snackBar.open('Login failed', 'Close', { duration: 3000 });
      }
    );
  }
}
