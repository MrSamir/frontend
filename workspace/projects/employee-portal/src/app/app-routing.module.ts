import { SearchRoutingModule } from './core/compoenents/search/SearchRouting/SearchRouting.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './core/compoenents/home/home.component';
import { PageoneComponent } from './core/compoenents/pageone/pageone.component';
import { PagetwoComponent } from './core/compoenents/pagetwo/pagetwo.component';
 

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, data: { breadcrumb: 'Home' } },
  { path: 'page-one', component: PageoneComponent, data: { breadcrumb: 'Page One' } },
  { path: 'page-two', component: PagetwoComponent, data: { breadcrumb: 'Page Two' } },
  { path: 'Search', loadChildren: () => import('./core/compoenents/search/SearchRouting/SearchRouting.module').then((m) => m.SearchRoutingModule), data: { breadcrumb: 'Search' }  },
  //{ path: 'Search', loadChildren: () => import('./features/search/search.module').then((m) => m.SearchModule), },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
