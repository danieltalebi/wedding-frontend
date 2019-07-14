import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Invitation} from '../model/Invitation';

export const apiURL = 'http://www.mocky.io/v2/5d0f526f3200005c00dc69df';

@Injectable({
  providedIn: 'root'
})
export class InvitationsService  {

  constructor(private httpClient: HttpClient) {
  }

  fetchInvitations(): Observable<Invitation[]> {
    return this.httpClient.get<Invitation[]>(apiURL);
  }

  findInvitation(invitationCode: string): Observable<Invitation> {
    return this.httpClient.get<Invitation>('http://www.mocky.io/v2/5d15d7e50e00002332a11555');
  }

}
