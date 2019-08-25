import { Invitation } from './../model/Invitation';
import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, catchError, retry} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { frontendCachedInvitations } from '../model/FrontendCachedInvitations';

@Injectable({
  providedIn: 'root'
})
export class InvitationsService implements OnInit {
  
  baseUrl: string;
  
  cachedFrontendInvitations: Invitation[] = frontendCachedInvitations //Used in case of backend failure
  backendInvitations: Invitation[] = null;
  
  constructor(private httpClient: HttpClient) {
    this.baseUrl = environment.baseUrl;
    
    this.fetchInvitations()
    .subscribe( (next: Invitation[]) =>  {
      console.log('Backend Invitations retrieved: ' + next.length)
      this.backendInvitations = next; 
    },
    error => console.error('An error has occurred whilst retrieving backend invitations. Error: ' + error));
  }
  
  ngOnInit() {
  }
  
  findInvitationFromBackendOrCached(code: string) {
    const invitationList = this.backendInvitations != null ? this.backendInvitations : this.cachedFrontendInvitations;
    return invitationList.find(invitation => invitation.code.toUpperCase() == code.toUpperCase())
  }

  findBackendInvitation(code: string) {
    if (!!!this.backendInvitations) {
      return null
    }
    return this.backendInvitations.find(invitation => invitation.code.toUpperCase == code.toUpperCase)
  }

  confirmAssistance(invitationCode: string, numberOfInviteesConfirmed: number) {
    console.log('Confirming ' + numberOfInviteesConfirmed + ' invitess for Invitation Code ' + invitationCode);
      
    let url = this.baseUrl + '/invitations/' + invitationCode + '/confirm/' + numberOfInviteesConfirmed;
      
    return this.httpClient.post(url, {});
  }
   
  private fetchInvitations(): Observable<Invitation[]> {
    console.log('Fetching Invitations');
    return this.httpClient.get<any>(this.baseUrl + '/invitations?page=0&size=1000&projection=InvitationProjection', {})
    .pipe(
      map(res => res._embedded.invitations || []),
      catchError(error => error.message || error)
      );
  }
    
    
  }
  