import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user = {
    username: '',
    email: '',
    password: ''
  };
  constructor(private http: HttpClient,private snackBar: MatSnackBar, private router: Router) {}

  onSubmit() {
   
    const apiUrl = 'https://seashell-app-2hkku.ondigitalocean.app/api/auth/signup'; 


    this.http.post(apiUrl, this.user).subscribe(
      (response) => {
        console.log('Registration successful:', response);
        this.showSnackbarMessage('Registration successful', false);
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Registration failed:', error);
        const errorMessage = error.error.message || 'An error occurred during registration';
        this.showSnackbarMessage(errorMessage, true);
      }
    );
  }

  // Function to show a snackbar message
  showSnackbarMessage(message: string, isError: boolean) {
    const panelClass = isError ? ['error-snackbar'] : undefined;

    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: panelClass,
    });
  }
}
