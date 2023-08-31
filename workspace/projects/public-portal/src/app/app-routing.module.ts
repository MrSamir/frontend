import { PublicActiveProfileGuardService } from './../../../core-lib/src/lib/services/public-active-profile-guard.service';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LandingComponent } from './layout/landing/landing.component';
import { AppInitializer } from '../../../core-lib/src/lib/application-configuration-loader/appInitializer';
import { PublicUserProfileComponent } from '../../../shared-features-lib/src/lib/components/public-user-profile/public-user-profile.component';
import { EmailConfirmationComponent } from 'projects/shared-features-lib/src/lib/components/email-confirmation/email-confirmation.component';
import { environment } from '../environments/environment';
import { AuthGuardService } from 'projects/core-lib/src/lib/services/auth-guard.service';
import { UpdateMissingSuccessMessageComponent } from 'projects/shared-features-lib/src/lib/endowment-registration/components/update-missing-success-message/update-missing-success-message.component';
import { AddRequestSuccessMessageComponent } from 'projects/shared-features-lib/src/lib/endowment-registration/components/add-request-success-message/add-request-success-message.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'الدخول للمنصة' },
  },
  {
    path: '',
    component: LoginComponent,
    data: { title: 'الدخول للمنصة' },
  },
  {
    path: 'landing',
    component: LandingComponent,
    data: { title: 'الخدمات الالكترونية' },
    canActivate: [PublicActiveProfileGuardService]
  },

  {
    path: 'endowmentregistration',
    loadChildren: () =>
      import(
        '../app/modules/endowment-registration/modules/endowment-registration.module'
      ).then((m) => m.EndowmentRegistrationModule),
    data: { title: 'تسجيل وقف' },
    canActivate: [PublicActiveProfileGuardService]
  },
  {
    path: 'userdashboard',
    loadChildren: () =>
      import('./modules/user-dashboard/modules/user-dashboard.module').then(
        (m) => m.UserDashBoardModule
      ),
    data: { title: 'طلبات' },
    canActivate: [PublicActiveProfileGuardService]
  },
  {
    path: 'userdashboard/:activeTab',
    loadChildren: () =>
      import('./modules/user-dashboard/modules/user-dashboard.module').then(
        (m) => m.UserDashBoardModule
      ),
    data: { title: 'طلبات' },
    canActivate: [PublicActiveProfileGuardService]
  },
  // {
  //   path: 'usertask',
  //   component: PublicUserTaskComponent,
  //   data: { title: 'مهامي' },
  //   canActivate:[PublicActiveProfileGuard]
  // },
  {
    path: 'public-user-profile',
    component: PublicUserProfileComponent,
    data: { title: 'الملف الشخصي', breadcrumb: 'الملف الشخصي' },
    title: 'الملف الشخصي',
    canActivate: [AuthGuardService]
  },
  {
    path: 'confirm-email/:userId/:confirmationCode',
    component: EmailConfirmationComponent,
    data: {
      title: 'تفعيل البريد الألكتروني',
      breadcrumb: 'تفعيل البريد الألكتروني',
    },
    title: 'تفعيل البريد الألكتروني',
    canActivate: [],

  },
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
  exports: [RouterModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (appInitializer: AppInitializer) => () =>
        appInitializer.loadAppConfig(environment),
      deps: [AppInitializer],
      multi: true,
    },
  ],
})
export class AppRoutingModule { }
