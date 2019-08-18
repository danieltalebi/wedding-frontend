export interface Invitation {
  code: string;
  displayName: string;
  numberOfInviteesAllowed: number;
  inviteesConfirmed: number;
  status: Status;
  source: InvitationSource;
}

export enum InvitationSource {
  FRONTEND,
  BACKEND
}

export enum Status {
  PENDING,
  CONFIRMED
}

