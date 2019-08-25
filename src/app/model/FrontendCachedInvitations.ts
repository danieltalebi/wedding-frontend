import { Invitation, Status, InvitationSource } from './Invitation';

export const frontendCachedInvitations: Invitation[] = [{
    code: 'ABC',
    displayName: 'Display Name 1',
    numberOfInviteesAllowed: 10,
    inviteesConfirmed: 0,
    status: Status.PENDING,
    source: InvitationSource.FRONTEND
  }, {
    code: 'ABC2',
    displayName: 'Display Name 2',
    numberOfInviteesAllowed: 10,
    inviteesConfirmed: 0,
    status: Status.PENDING,
    source: InvitationSource.FRONTEND
  }]