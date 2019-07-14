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
    const invitationsObservable: Observable<Invitation[]> = this.invitationsService.fetchInvitations();
    invitationsObservable.subscribe(
      (data: Invitation[]) => this.invitationList = data);
  }

  findInvitation() {
    console.log('defaultValue is ' + this.invitationCode);
    const invitationObservable = this.invitationsService.findInvitation(this.invitationCode);
    invitationObservable.subscribe(
      (data: Invitation) => {
        if (data != null) {
          this.inviteesNumber = data.invitees;
          this.showVideo();
        } else {
          this.warningLabel = 'Could not find Invitation ' + this.invitationCode;
        }
      },
      (error) => {
        console.log('The error is ' + error.message);
        this.warningLabel = 'Sorry we couldn\'t find your invitation :(';
      });

  }

  showVideo() {
    this.hideCodeValidationDiv = true;
    this.videoPlayer.playVideo();
  }


}
