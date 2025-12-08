export interface UserRole {
  id: number;
  name: string;
}

export interface User {
  sub: string;
  nickname?: string;
  name: string;
  picture: string;
  updated_at: string;
  email: string;
  email_verified: boolean;
  emrId: string;
  role: UserRole;
}

export interface Auth0UserJson {
  sub: string;
  nickname?: string;
  name: string;
  picture: string;
  updated_at: string;
  email: string;
  email_verified: boolean;
}
