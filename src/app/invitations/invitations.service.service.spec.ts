import { TestBed } from '@angular/core/testing';
import {Invitation} from '../model/Invitation';


describe('Invitations.ServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Invitation = TestBed.get(Invitation);
    expect(service).toBeTruthy();
  });
});
