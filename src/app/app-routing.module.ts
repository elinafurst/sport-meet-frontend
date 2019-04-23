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


const routes: Routes = [
  {
    path:"home", component: LandingPageComponent
  },
  {
    path:"logga-in", component: LoginComponent
  },
  {
    path:"registrera", component: SignUpComponent
  },
  {
    path: "events", component: EventListComponent
  },
  {
    path: "events/registrera/form", component: EventFormComponent
  },
  {
    path: "users/:id", component: UserDetailsComponent
  },
  {
    path: "events/:id", component: EventDetailsComponent
  },
  {
    path: "grupper", component: UnitListComponent
  },
  {
    path: "grupper/:id", component: UnitDeatilsComponent
  },
  {
    path: "grupper/registera/form", component: UnitFormComponent
  },
  {
    path: "konto/mina-sidor", component: UserUpdateComponent
  },


   //canActivate: [AuthGuardService]
 
  { path: '**', redirectTo: 'home' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
