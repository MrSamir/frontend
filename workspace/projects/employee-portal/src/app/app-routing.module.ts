import { SearchRoutingModule } from './core/compoenents/search/SearchRouting/SearchRouting.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './core/compoenents/home/home.component';
import { PageoneComponent } from './core/compoenents/pageone/pageone.component';
import { PagetwoComponent } from './core/compoenents/pagetwo/pagetwo.component';
import { LoginComponent } from './core/compoenents/login/login.component';

const routes: Routes = [
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  
  { path: '', component: LoginComponent }, // Update with your default component



  {
    path: 'employee',
    loadChildren: () => import('projects/employee-portal/src/app/modules/employee-portal.module').then(m => m.EmployeePortalModule),data: { breadcrumb: 'منصة الاستعلامات' } 
   
  }
 

  

 




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
