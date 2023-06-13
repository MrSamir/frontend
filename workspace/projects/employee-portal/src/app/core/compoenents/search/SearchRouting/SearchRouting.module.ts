 



import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchRoutingComponent } from './SearchRouting.component';
 

const routes: Routes = [{ path: 'sss', component: SearchRoutingComponent, data: { breadcrumb: 'Search Child' }}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchRoutingModule {}