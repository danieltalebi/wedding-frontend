import {InvitationsService} from '../invitation-validator/invitations.service';
import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {VideoPlayerComponent} from '../video-player/video-player.component';
import {Invitation} from '../model/Invitation';

@Component({
  selector: 'app-invitations',
  templateUrl: './invitations.component.html',
  styleUrls: ['./invitations.component.css']
})
export class InvitationsComponent implements OnInit {

  constructor(private invitationsService: InvitationsService,
              private videoPlayer: VideoPlayerComponent) {
  }

  invitationCode = '';
  hideCodeValidationDiv = false;
  inviteesNumber = 0;
  warningLabel = 'this is the warning label';

  invitationList: Invitation[] = [];

  ngOnInit() {
    this.retrieveInvitations();
    console.log('InvitationList is ' + this.invitationList);
  }

  retrieveInvitations() {
  }


  showVideo() {
    this.hideCodeValidationDiv = true;
    this.videoPlayer.playVideo();
  }


}
