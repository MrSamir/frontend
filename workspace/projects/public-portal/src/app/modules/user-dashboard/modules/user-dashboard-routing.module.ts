import { NgModule } from '@angular/core';
import { UserDashBoardModule } from './user-dashboard.module';
import { RouterModule, Routes } from '@angular/router';
import { MyRequestsComponent } from '../components/my-requests/my-requests.component';
import { MyTasksComponent } from '../components/my-tasks/my-tasks.component';
import { UserDashboardComponent } from '../components/user-dashboard/user-dashboard.component';



const routes: Routes = [
  { path: '', component: UserDashboardComponent, data: { title: 'طلبات', breadcrumb: 'طلبات' } },
  { path: 'myrequests', component: MyRequestsComponent, data: { title: 'طلباتي', breadcrumb: 'طلباتي' } },
  { path: 'mytasks', component: MyTasksComponent, data: { title: 'مهامي', breadcrumb: 'مهامي' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserDashBoardRoutingModule {

}