import { InvitationsService } from './../invitation-validator/invitations.service';
import { Invitation, InvitationSource, Status } from './../model/Invitation';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, Injectable, Input } from '@angular/core';

declare const Waypoint: any;

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-confirm-invitees',
  templateUrl: './confirm-invitees.component.html',
  styleUrls: ['./confirm-invitees.component.css']
})
export class ConfirmInviteesComponent implements OnInit {
  
  invitation: Invitation;
  validationForm: FormGroup;
  isConfirmationComplete = false;
  showErrorMessage = false;
  defaultNumberOfInvitees = 1;
  
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
    }
    
    @Input('invitation')
    set setInvitation(invitation: Invitation) {
      if (invitation.source == InvitationSource.FRONTEND) {
        const backendInvitation = this.invitationService.findBackendInvitation(invitation.code)
        if (backendInvitation == null) {
          this.showErrorMessage = true;
        } else {
          invitation = backendInvitation;
        }
      }
      this.invitation = invitation;
      this.defaultNumberOfInvitees = this.invitation.numberOfInviteesAllowed;
      this.validationForm.controls['inviteesConfirmed'].patchValue(this.invitation.numberOfInviteesAllowed);
    }
    
    getInviteesNumber(): Array<number> {
      if (!! this.invitation) {
        return new Array<number>(this.invitation.numberOfInviteesAllowed).fill(0).map((x, i) => i + 1)
      } else {
        return new Array<number>(2).fill(0).map((x, i) => i + 1)
      }
    }
    
    onSubmit(formData) {
      const numberOfInviteesConfirmed: number = formData.inviteesConfirmed;
      
      this.invitationService.confirmAssistance(this.invitation.code, numberOfInviteesConfirmed)
      .subscribe(next => {
        this.invitation.status = Status.CONFIRMED;
        this.invitation.inviteesConfirmed = numberOfInviteesConfirmed;
        this.showErrorMessage = false;
      },
      error => {
        this.showErrorMessage = true;
        console.log('An error has occurred. Error: ' + error);
      })
    }
    
    
    showConfirmationForm() {
      return this.invitation.status != Status.CONFIRMED && this.invitation.source != InvitationSource.FRONTEND;
    }
    
    getConfirmationMessage() {
      if (this.invitation.status == Status.CONFIRMED) {
        if (this.invitation.inviteesConfirmed > 0) {
          return '¡Prepará tus mejores pasos de baile!'
        } else {
          return '¡Que lastima no contar con vos!'
        }
      } else {
        return '';
      }

    }
    
    change() {
      this.invitation.status = Status.PENDING;
    }
    
    createWaypoint(item: Element) {
      const waypoint = new Waypoint({
        element: item,
        handler: (direction) => {
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
  