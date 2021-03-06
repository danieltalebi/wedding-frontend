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

  showWarningLabel = false;
  validationForm: FormGroup;

  backendInvitations: Invitation[];
  temporaryInvitations: Invitation[] = [{
    code: 'ABC',
    displayName: 'Display Name',
    numberOfInviteesAllowed: 10,
    inviteesConfirmed: 0,
    status: Status.PENDING,
    source: InvitationSource.FRONTEND
  }, {
    code: 'ABC2',
    displayName: 'Display Name',
    numberOfInviteesAllowed: 10,
    inviteesConfirmed: 0,
    status: Status.PENDING,
    source: InvitationSource.FRONTEND
  }];

  @Output()
  notify = new EventEmitter<Invitation>();

  @ViewChild('myVideo', {static: false}) myVideo: ElementRef;

  constructor(private invitationsService: InvitationsService,
              private formBuilder: FormBuilder) {
    this.validationForm = this.formBuilder.group({
      code: ''
    });
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.playVideoIfPaused();
  }

  onSubmit(formData) {
    const invitation = this.findInvitation(formData.code);
    if (invitation != null) {
      this.notify.emit(invitation);
      this.showWarningLabel = false;
    } else {
      this.showWarningLabel = true;
    }
    this.validationForm.reset();
  }


  findInvitation(invitationCode: string): Invitation {
    return this.invitationsService.findInvitationFromBackendOrCached(invitationCode);
  }


  playVideoIfPaused() {
    if (!!this.myVideo.nativeElement) {
      this.myVideo.nativeElement.play();
    }
  }


}
