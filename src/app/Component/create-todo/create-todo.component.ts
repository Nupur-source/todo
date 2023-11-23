import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import {TodoService} from 'src/app/todo.service';
import { Router } from '@angular/router';

interface TodoResponse {
  id:string;
  // Add other properties if they exist in the response
}
@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.css']
})
export class CreateTodoComponent {
  create = {
    todo_title: '',
    todo_description: '',
  };

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private snackBar: MatSnackBar,
    private todoService: TodoService,
    private router: Router
  ) {}

  onSubmit() {
    const userId = this.cookieService.get('user_id');
   

    const apiUrl = 'https://seashell-app-2hkku.ondigitalocean.app/api/todo/add';
    if (userId) {
      // Include userId in the request body
      const requestData = {
        ...this.create,
        user_id: userId
      };
      console.log(requestData);
      
      this.http.post<TodoResponse>(apiUrl, requestData).subscribe(
        (response) => {
          // Handle the response here (e.g., show a success message)
          console.log('Task created successfully', response);
          if (response.id) {
            this.cookieService.set('todo_id', response.id);
            this.todoService.setTodoData(response);
            // Display success message using MatSnackBar
            this.snackBar.open('Todo created successfully', 'Close', { duration: 3000 });
            this.router.navigate(['/dashboard']);
          } else {
            console.error('Failed to retrieve task ID from the response.');
          }
        },
        (error) => {
          console.error('Failed:', error);
          // Display error message using MatSnackBar
          this.snackBar.open('Todo creation failed', 'Close', { duration: 3000 });
        }
      );
    }
  }
}