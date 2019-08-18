import { Invitation } from './../model/Invitation';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, catchError} from 'rxjs/operators';

export const herokuAPIUrl = 'https://wedding-backend-arg.herokuapp.com/invitations?page=0&size=1000&projection=InvitationProjection';
export const localhostAPIUrl = 'http://localhost:9002/invitations';

@Injectable({
  providedIn: 'root'
})
export class InvitationsService  {

  constructor(private httpClient: HttpClient) {
  }

  fetchInvitations(): Observable<Invitation[]> {
    console.log('Fetching Invitations');
    return this.httpClient.get<any>(herokuAPIUrl, {})
    .pipe(
      map(res => res._embedded.invitations || []),
      catchError(error => error.message || error)
    );
  }

}
