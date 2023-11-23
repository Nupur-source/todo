import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTodoComponent } from './Component/create-todo/create-todo.component';
import { DashboardComponent } from './Component/dashboard/dashboard.component';
import { DeleteTodoComponent } from './Component/delete-todo/delete-todo.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './Component/login/login.component';
import { RegisterComponent } from './Component/register/register.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },

  {path:'create',component:CreateTodoComponent, canActivate: [AuthGuard]},
  
  {path:'delete',component:DeleteTodoComponent, canActivate: [AuthGuard]},

  { path: '', redirectTo: '/register', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
