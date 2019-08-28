import { Invitation, Status } from './../model/Invitation';
import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {map, catchError, retry, retryWhen, delay, take} from 'rxjs/operators';
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
      retryWhen(errors => errors.pipe(delay(5000), take(100))),
      map(response => {
        if (!!response._embedded.invitations) {
          let invitations: Invitation[] = response._embedded.invitations;
          invitations.forEach(invitation => {
            //From the backend, the enum comes as string, we need to parse it
            invitation.status = Status[invitation.status.toString()];
          }
          )
          return <any>invitations;
        }
        return [];
      }),
      catchError(this.handleError)
    );
  }
    
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}` +
        `message was: ${error.message}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };  
}
  