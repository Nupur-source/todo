
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todoData = new BehaviorSubject<any>(null);
  todoData$ = this.todoData.asObservable();

  setTodoData(data: any) {
    this.todoData.next(data);
  }

  clearTodoData() {
    this.todoData.next(null);
  }
}
