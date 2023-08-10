import { NgModule } from '@angular/core';
import { UserProfileModule } from './user-profile.module';
import { RouterModule, Routes } from '@angular/router';
import { MyRequestsComponent } from '../components/my-requests/my-requests.component';



const routes: Routes = [ 
    { path: '', component: MyRequestsComponent,data: { title: 'مهامي' ,breadcrumb:'مهامي' } },
   
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserProfileRoutingModule{

}