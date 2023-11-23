import { Component } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { TodoService } from 'src/app/todo.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-delete-todo',
  templateUrl: './delete-todo.component.html',
  styleUrls: ['./delete-todo.component.css']
})
export class DeleteTodoComponent {
  selectedTodo: any;
 
  constructor(
    private http: HttpClient,
    private todoService: TodoService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.todoService.todoData$.subscribe(data => {
      this.selectedTodo = data;
    });
  }
  onDeleteTodo() {
    // Get the todo_id from the cookie
    const todo_id = this.selectedTodo.id;

    if (todo_id) {
      const apiUrl = `https://seashell-app-2hkku.ondigitalocean.app/api/todo/delete`;

      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
  
      const body = { todo_id: todo_id };
  
      this.http.post(apiUrl, body, { headers }).subscribe(
        (response) => {
          // Handle success, e.g., show a success message
          console.log('Todo deleted successfully');
          this.todoService.clearTodoData();
          this.snackBar.open('Todo deleted successfully', 'Close', {
            duration: 3000 // Adjust the duration as needed
          });
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          console.error('Failed to delete todo:', error);
          // Handle the error, e.g., show an error message
        }
      );
    } else {
      console.error('Missing todo_id in the cookie. Cannot delete todo.');
      this.snackBar.open('Todo deletion failed', 'Close', { duration: 3000 });
      
    }
  }
}
