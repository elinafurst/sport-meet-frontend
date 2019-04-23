
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { EventDetailsComponent } from './events/event-details/event-details.component';
import { SignUpComponent } from './users/auth/sign-up/sign-up.component';
import { LoginComponent } from './users/auth/login/login.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { EventListComponent } from './events/event-list/event-list.component';
import { UnitListComponent } from './units/unit-list/unit-list.component';
import { UnitDeatilsComponent } from './units/unit-deatils/unit-deatils.component';
import { UnitFormComponent } from './units/unit-form/unit-form.component';
import { EventFormComponent } from './events/event-form/event-form.component';
import { CommentListComponent } from './events/comment-list/comment-list.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { UserUpdateComponent } from './users/user-update/user-update.component';
import { EventFilterComponent } from './events/event-filter/event-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EventListComponent,
    EventDetailsComponent,
    SignUpComponent,
    UserDetailsComponent,
    UnitListComponent,
    UnitDeatilsComponent,
    UnitFormComponent,
    EventFormComponent,
    CommentListComponent,
    LandingPageComponent,
    UserUpdateComponent,
    EventFilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
