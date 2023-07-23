import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/components/login/login.component';
import { LandingComponent } from './core/components/landing/landing.component';

const routes: Routes = [

  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'الدخول للمنصة' }
  },
  {
    path: '',
    component: LoginComponent,
    data: { title: 'الدخول للمنصة' }
  },
  {
    path: 'landing',
    component: LandingComponent,
    data: { title: 'الخدمات الالكترونية' }
  },

  {
    path: 'endowmentregistration', 
    loadChildren: () => import('../app/modules/endowment-registration/modules/endowment-registration.module').then(m => m.EndowmentRegistrationModule),
     data: { title: 'تسجيل وقف' }
  },
  // {
  //   path: 'usertask',
  //   component: PublicUserTaskComponent,
  //   data: { title: 'مهامي' },
  //   canActivate:[PublicActiveProfileGuard]
  // },
  // {
  //   path: 'my-profile',
  //   component: MyProfileComponent,
  //   data: { title: 'الملف الشخصي' },
  //   canActivate:[AuthGuard]
  // },
  // {
  //   path: 'confirm-email/:userId/:confirmationCode',
  //   component: EmailConfirmationComponent,
  //   data: { title: 'تفعيل البريد الألكتروني' },
  //   canActivate:[]
  // },
  // {
  //   path: 'dashboard',
  //   component: HomePageComponent,
  //   data: { title: 'لوحة التحكم' },
  //   canActivate:[AuthGuard]
  // },
//   {path: "request-details", component: RequestDetailsComponent , canActivate:[AuthGuard]},
//   {
//     path: '',
//     loadChildren: () => import('@pages/public-portal/ui-create-waqf/ui-create-waqf.module').then(m => m.UiCreateWaqfModule)
//   },
//   {
//     path: 'editwaqf',
//     loadChildren: () => import('@pages/public-portal/ui-edit-waqf/editWaqfRequest.module').then(m => m.EditWaqfRequestModule)
//   },
//   {
//     path: 'seerRegistration',
//     data: { title: 'تسجيل ناظر' },
//     loadChildren: () => import('@pages/public-portal/ui-create-seer-registration/ui-create-seer-registration.module').then(m => m.UiCreatSeerRegistrationModule)
//   },

//  {
//      path: 'seerRequestDetails',
//     loadChildren: () => import('@pages/public-portal/ui-seer-details/ui-seer-details.module').then(m => m.UiSeerDetailsModule)
//   },
//   {
//     path: 'seerCertifications',
//     loadChildren: () => import('@pages/public-portal/seer-certifications-public-user/seer-certifications-public-user.module').then(m => m.SeerCertificationsPublicUserModule),
//   },

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
