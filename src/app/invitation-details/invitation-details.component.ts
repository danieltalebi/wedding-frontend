import { FormGroup, FormBuilder } from '@angular/forms';
import { Status, InvitationSource } from './../model/Invitation';
import { Component, OnInit, Injectable } from '@angular/core';
import { Invitation } from '../model/Invitation';
import { InvitationsService } from '../invitation-validator/invitations.service';


declare const Waypoint: any;
declare const simplyCountdown: any;

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-invitation-details',
  templateUrl: './invitation-details.component.html',
  styleUrls: ['./invitation-details.component.css']
})
export class InvitationDetailsComponent implements OnInit {

  invitation: Invitation;
  validationForm: FormGroup;

  constructor(private invitationService: InvitationsService,
    private formBuilder: FormBuilder) {
      this.validationForm = this.formBuilder.group({
        inviteesConfirmed: Number
      });
  }

  ngOnInit() {
    const items = Array.from(document.getElementsByClassName('animate-box'));
    for (const item of items) {
      this.createWaypoint(item);
    }
    const weddingDate = new Date(2019, 9, 12, 18, 0, 0);

    simplyCountdown('.simply-countdown-one', {
      year: weddingDate.getFullYear(),
      month: weddingDate.getMonth() + 1,
      day: weddingDate.getDate()
    });

    this.invitation = {
      code: 'ABC2',
      displayName: 'Ariel y Vicky',
      numberOfInviteesAllowed: 3,
      inviteesConfirmed: 0,
      status: Status.PENDING,
      source: InvitationSource.FRONTEND
    }
  }

  getInviteesNumber(): Array<number> {
    return new Array<number>(5).fill(0).map((x, i) => i + 1)
  }

  onSubmit(formData) {
    const numberOfInviteesConfirmed: number = formData.inviteesConfirmed;
    this.invitationService.confirmAssistance(this.invitation.code, numberOfInviteesConfirmed);
  }

  createWaypoint(item: Element) {
    const waypoint = new Waypoint({
      element: item,
      handler: (direction) => {
        console.log('The direction is ' + direction);
        if (direction === 'down') {
          item.classList.remove('fadeOutUp', 'animated');
          item.classList.add('fadeInUp', 'animated');
        } else {
          item.classList.remove('fadeInUp', 'animated');
          item.classList.add('fadeOutUp', 'animated');
        }
      },
      offset: '95%'
    });
  }

}
