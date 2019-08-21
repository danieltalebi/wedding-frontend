import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { InvitationsComponent } from './invitations/invitations.component';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { NgxYoutubePlayerModule } from 'ngx-youtube-player';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { InvitationValidatorComponent } from './invitation-validator/invitation-validator.component';
import { LandingComponent } from './landing/landing.component';
import { InvitationDetailsComponent } from './invitation-details/invitation-details.component';
import { ConfirmInviteesComponent } from './confirm-invitees/confirm-invitees.component';


@NgModule({
  declarations: [
    AppComponent,
    InvitationsComponent,
    VideoPlayerComponent,
    InvitationValidatorComponent,
    LandingComponent,
    InvitationDetailsComponent,
    ConfirmInviteesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgxYoutubePlayerModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
