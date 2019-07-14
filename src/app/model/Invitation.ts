export interface Invitation {
  id: string;
  status: Status;
  invitees: number;
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

