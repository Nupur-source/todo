import { Component, OnInit } from '@angular/core';
import {TodoService} from 'src/app/todo.service';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  todoData: any;
  userName: string;
  todos: any = [];

  constructor(private todoService: TodoService,private cookieService: CookieService, private http: HttpClient, 
    private snackBar: MatSnackBar,
    private router: Router) {
    this.userName = this.cookieService.get('user_name');
    this.todoService.todoData$.subscribe(data => {
      this.todoData = data;
    });
  }
  isTodoDataArray(): boolean {
    return Array.isArray(this.todoData);
  }
  // Call the findTodos method when the component is initialized.
  logout(): void {
    // Clear all cookies related to authentication
    this.cookieService.delete('user_id');
    this.cookieService.delete('user_name');
    this.cookieService.delete('accessToken');

    // Redirect back to login page after logout
    this.router.navigate(['/login']);
  }

  findTodo(): void {
    const user_id = this.cookieService.get('user_id');
    const apiUrl = 'https://seashell-app-2hkku.ondigitalocean.app/api/todo/find/user';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const body = { user_id: user_id };

    this.http.post(apiUrl, body, { headers }).subscribe(
      (response) => {
        this.todos = response;
        console.log('Received API response:', this.todos);
        this.todoService.setTodoData(response);
        this.showSuccessSnackBar('Todos fetched successfully.');
      },
      (error) => {
        console.error('Error fetching todos:', error);
        this.showErrorSnackBar('Failed to fetch todos.');
      }
    );
  }
  private showSuccessSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000, // Adjust the duration as needed
      panelClass: ['success-snackbar'], // You can define styles for success messages in your CSS
    });
  }

  private showErrorSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000, // Adjust the duration as needed
      panelClass: ['error-snackbar'], // You can define styles for error messages in your CSS
    });
  }

  editTodo(todo: any): void {
    // Save the selected todo to a service for use in the "Delete" component
    this.todoService.setTodoData(todo);
console.log(todo);
    // Navigate to the "Delete" component
    this.router.navigate(['/delete']);
  }

}
