import { Component, OnInit } from '@angular/core';
import {InvitationValidatorComponent} from '../invitation-validator/invitation-validator.component';
import {VideoPlayerComponent} from '../video-player/video-player.component';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  showCodeValidatorContainer = true;
  showVideoContainer = false;
  showInvitationDetailsContainer = false;

  constructor(private invitationValidator: InvitationValidatorComponent,
              private videoPlayer: VideoPlayerComponent) { }

  ngOnInit() {
  }

  onValidationSuccessful() {
    this.showCodeValidatorContainer = false;
    this.showVideoContainer = true;
    this.videoPlayer.playVideo();
  }

  onVideoFinished() {
    this.showVideoContainer = false;
    this.showInvitationDetailsContainer = true;
  }
}
