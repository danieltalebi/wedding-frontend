import { Component, OnInit } from '@angular/core';
import {InvitationValidatorComponent} from '../invitation-validator/invitation-validator.component';
import {VideoPlayerComponent} from '../video-player/video-player.component';
import { Invitation } from '../model/Invitation';
import { InvitationDetailsComponent } from '../invitation-details/invitation-details.component';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  invitation: Invitation;
  showCodeValidatorContainer = false;
  showVideoContainer = false;
  showInvitationDetailsContainer = true;

  constructor(private invitationValidator: InvitationValidatorComponent,
              private videoPlayer: VideoPlayerComponent,
              private invitationDetails: InvitationDetailsComponent) { }

  ngOnInit() {
  }

  onValidationSuccessful(invitation: Invitation) {
    this.invitation = invitation;
    this.showCodeValidatorContainer = false;
    this.showVideoContainer = true;
    this.videoPlayer.playVideo();
  }

  onVideoFinished() {
    this.showVideoContainer = false;
    this.showInvitationDetailsContainer = true;
  }
}
