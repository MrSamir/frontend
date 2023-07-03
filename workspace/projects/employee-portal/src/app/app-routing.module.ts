import { SearchRoutingModule } from './core/compoenents/search/SearchRouting/SearchRouting.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './core/compoenents/home/home.component';
import { PageoneComponent } from './core/compoenents/pageone/pageone.component';
import { PagetwoComponent } from './core/compoenents/pagetwo/pagetwo.component';
import { LoginComponent } from './core/compoenents/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, data: { breadcrumb: 'Home' } },
  { path: 'page-one', component: PageoneComponent, data: { breadcrumb: 'Page One' } },
  { path: 'page-two', component: PagetwoComponent, data: { breadcrumb: 'Page Two' } },
  { path: 'Search', loadChildren: () => import('./core/compoenents/search/SearchRouting/SearchRouting.module').then((m) => m.SearchRoutingModule), data: { breadcrumb: 'Search' }  },
  //{ path: 'Search', loadChildren: () => import('./features/search/search.module').then((m) => m.SearchModule), },
 
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
