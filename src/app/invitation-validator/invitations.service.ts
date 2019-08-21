import { Invitation } from './../model/Invitation';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export const herokuAPIUrl = 'https://wedding-backend-arg.herokuapp.com/invitations?page=0&size=1000&projection=InvitationProjection';
export const localhostAPIUrl = 'http://localhost:9002/invitations';

export const confirmInvitationHerokuUrl = 'https://wedding-backend-arg.herokuapp.com/invitations/${invitationCode}/invitees/${numberOfInviteesConfirmed}'

@Injectable({
  providedIn: 'root'
})
export class InvitationsService  {

baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = environment.baseUrl;
  }

  fetchInvitations(): Observable<Invitation[]> {
    console.log('Fetching Invitations');
    return this.httpClient.get<any>(this.baseUrl + '/invitations?page=0&size=1000&projection=InvitationProjection', {})
    .pipe(
      map(res => res._embedded.invitations || []),
      catchError(error => error.message || error)
    );
  }

  confirmAssistance(invitationCode: string, numberOfInviteesConfirmed: number) {
    console.log('Confirming ' + numberOfInviteesConfirmed + ' invitess for Invitation Code ' + invitationCode);
    
    let url = this.baseUrl + '/invitations/' + invitationCode + '/confirm/' + numberOfInviteesConfirmed;

    return this.httpClient.post(url, {});
  }

}
