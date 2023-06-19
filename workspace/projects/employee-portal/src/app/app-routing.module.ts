import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 
 
import { LoginComponent } from './core/compoenents/login/login.component';
  

const routes: Routes = [


  { path: '', component: LoginComponent }, // Update with your default component



  {
    path: 'employee',
    loadChildren: () => import('projects/employee-portal/src/app/modules/employee-portal.module').then(m => m.EmployeePortalModule)
   
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
