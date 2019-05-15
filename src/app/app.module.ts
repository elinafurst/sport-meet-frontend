
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
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { DlDateTimeDateModule, DlDateTimePickerModule } from 'angular-bootstrap-datetimepicker';
import ServiceUtils from './service-utils';
import { UnitOwnerComponent } from './units/unit-owner/unit-owner.component';
import { RouterModule } from '@angular/router';
import { RequestListComponent } from './events/requests/request-list/request-list.component';
import { EventMessagePopupComponent } from './events/requests/event-message-popup/event-message-popup.component';
import { RequestDetailsComponent } from './events/requests/request-details/request-details.component';
import { EventOwnerComponent } from './events/event-owner/event-owner.component';
import { EventUpdateComponent } from './events/event-update/event-update.component';
import { UnitUpdateComponent } from './units/unit-update/unit-update.component';
import { ForgotPasswordComponent } from './users/auth/forgot-password/forgot-password.component';
import { NewPasswordComponent } from './users/auth/new-password/new-password.component';
import { RequestPipe, ListPipe } from './shared/Truncatpipe';


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
    UnitOwnerComponent,
    EventMessagePopupComponent,
    RequestListComponent,
    RequestDetailsComponent,
    EventOwnerComponent,
    EventUpdateComponent,
    UnitUpdateComponent,
    ForgotPasswordComponent,
    NewPasswordComponent,
    RequestPipe,
    ListPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    NgbModule.forRoot(),
    DlDateTimeDateModule,  
    DlDateTimePickerModule,    
  ],
  providers: [ServiceUtils],
  bootstrap: [AppComponent],
  entryComponents: [
    EventMessagePopupComponent
  ]
})
export class AppModule { }
