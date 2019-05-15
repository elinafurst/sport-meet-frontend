import { NewPasswordComponent } from './users/auth/new-password/new-password.component';
import { ForgotPasswordComponent } from './users/auth/forgot-password/forgot-password.component';
import { UserUpdateComponent } from './users/user-update/user-update.component';
import { UnitListComponent } from './units/unit-list/unit-list.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventDetailsComponent } from './events/event-details/event-details.component';
import { SignUpComponent } from './users/auth/sign-up/sign-up.component';
import { LoginComponent } from './users/auth/login/login.component';
import { EventListComponent } from './events/event-list/event-list.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { UnitFormComponent } from './units/unit-form/unit-form.component';
import { UnitDeatilsComponent } from './units/unit-deatils/unit-deatils.component';
import { EventFormComponent } from './events/event-form/event-form.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AuthGuardService as AuthGuard } from './guards/auth-guard.service';
import { RequestListComponent } from './events/requests/request-list/request-list.component';
import { RequestDetailsComponent } from './events/requests/request-details/request-details.component';
import { UnitOwnerComponent } from './units/unit-owner/unit-owner.component';
import { EventOwnerComponent } from './events/event-owner/event-owner.component';
import { EventUpdateComponent } from './events/event-update/event-update.component';
import { UnitUpdateComponent } from './units/unit-update/unit-update.component';

const routes: Routes = [
  {
    path:"home", component: LandingPageComponent
  },
  {
    path:"logga-in", component: LoginComponent
  },
  {
    path:"password/reset", component: ForgotPasswordComponent
  },
  {
    path:"password/reset/:id", component: NewPasswordComponent
  },
  {
    path:"registrera", component: SignUpComponent
  },
  {
    path: "events", component: EventListComponent
  },
  {
    path: "events/registrera/form", component: EventFormComponent, canActivate: [AuthGuard] 
  },
  {
    path: "users/:id", component: UserDetailsComponent, canActivate: [AuthGuard] 

  },
  {
    path: "events/:id", component: EventDetailsComponent, canActivate: [AuthGuard] 
  },
  {
    path: "grupper", component: UnitListComponent, canActivate: [AuthGuard] 
  },
  {
    path: "grupper/:id", component: UnitDeatilsComponent, canActivate: [AuthGuard] 
  },
  {
    path: "grupper/registera/form", component: UnitFormComponent, canActivate: [AuthGuard] 
  },
  {
    path: "mina-sidor/konto", component: UserUpdateComponent, canActivate: [AuthGuard] 
  },
  {
    path: "mina-sidor/grupper", component: UnitOwnerComponent, canActivate: [AuthGuard] 
  },
  {
    path: "mina-sidor/grupper/:id", component: UnitUpdateComponent, canActivate: [AuthGuard] 
  },
  {
    path: "mina-sidor/events", component: EventOwnerComponent, canActivate: [AuthGuard] 
  },
  {
    path: "mina-sidor/events/:id", component: EventUpdateComponent, canActivate: [AuthGuard] 
  },
  {
    path: "inbox", component: RequestListComponent, canActivate: [AuthGuard] 
  },
  {
    path: "inbox/:id", component: RequestDetailsComponent, canActivate: [AuthGuard] 
  },
 
  { path: '**', redirectTo: 'home' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
