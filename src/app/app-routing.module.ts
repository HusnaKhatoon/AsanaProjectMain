import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckDashboardGuard } from './guards/check-dashboard.guard';
import { CheckLoginGuard } from './guards/check-login.guard';
const routes: Routes = [
  {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
  },
  {
      path: 'dashboard',
      loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
      canActivate: [CheckDashboardGuard]
  },
  {
      path: 'login',
      component: LoginComponent,
      canActivate: [CheckLoginGuard]
  },
  {
      path: "**",
      redirectTo: 'dashboard',
      pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), FormsModule, CommonModule, ReactiveFormsModule],
  exports: [RouterModule],
  declarations: [LoginComponent]
})
export class AppRoutingModule { }
