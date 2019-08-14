import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Injectable,
  OnInit,
  Optional,
  Output,
  ViewChild
} from '@angular/core';
import {Observable} from 'rxjs';
import {InvitationsService} from './invitations.service';
import {Invitation, InvitationSource, Status} from '../model/Invitation';
import {Option} from '@angular/cli/models/interface';
import {FormBuilder, FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-invitation-validator',
  templateUrl: './invitation-validator.component.html',
  styleUrls: ['./invitation-validator.component.css']
})
export class InvitationValidatorComponent implements OnInit, AfterViewInit {

  invitationCode = '';
  inviteesNumber = 0;
  showWarningLabel = false;
  validationForm: FormGroup;

  backendInvitations: Invitation[];
  temporaryInvitations: Invitation[] = [{
    id: 'ABC',
    invitees: 0,
    status: Status.PENDING,
    source: InvitationSource.FRONTEND
  }, {
    id: 'DEF',
    invitees: 1,
    status: Status.PENDING,
    source: InvitationSource.FRONTEND
  }];

  @Output()
  notify = new EventEmitter();

  @ViewChild('myVideo', {static: false}) myVideo: ElementRef;

  constructor(private invitationsService: InvitationsService,
              private formBuilder: FormBuilder) {
    this.validationForm = this.formBuilder.group({
      code: ''
    });
  }

  ngOnInit() {
    this.invitationsService.fetchInvitations()
      .subscribe((data: Invitation[]) => this.backendInvitations = data);
  }

  ngAfterViewInit(): void {
    this.playVideoIfPaused();
  }

  onSubmit(formData) {
    const invitation = this.findInvitation(formData.code);
    if (invitation != null) {
      this.notify.emit();
      this.showWarningLabel = false;
    } else {
      this.showWarningLabel = true;
    }
    this.validationForm.reset();
  }

  validateInvitationCode() {
    const invitation = this.findInvitation(this.invitationCode);
    if (invitation != null) {
      this.notify.emit();
    } else {
      this.showWarningLabel = true;
      this.invitationCode = '';
    }
  }

  hideWarningLabel() {
    this.showWarningLabel = false;
  }

  findInvitation(invitationCode: string): Invitation {
    const invitationList = this.backendInvitations != null ? this.backendInvitations : this.temporaryInvitations;
    return invitationList.find(invitation => invitation.id.toUpperCase() === invitationCode.toUpperCase());
  }

  /*retrieveInvitations() {
    const invitationsObservable: Observable<Invitation[]> = this.invitationsService.fetchInvitations();
  }*/

  /*findInvitation() {
    console.log('defaultValue is ' + this.invitationCode);
    const invitationObservable = this.invitationsService.findInvitation(this.invitationCode);
    invitationObservable.subscribe(
      (data: Invitation) => {
        if (data != null) {
          this.inviteesNumber = data.invitees;
          // this.showVideo();
          this.notify.emit();
        } else {
          this.warningLabel = 'Could not find Invitation ' + this.invitationCode;
        }
      },
      (error) => {
        console.log('The error is ' + error.message);
        this.warningLabel = 'Sorry we couldn\'t find your invitation :(';
      });

  }*/

  playVideoIfPaused() {
    if (!!this.myVideo.nativeElement) {
      this.myVideo.nativeElement.play();
    }
  }


}
