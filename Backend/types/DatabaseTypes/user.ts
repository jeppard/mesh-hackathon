export interface UserDB {
  id: number,
  username: string,
  password: string;
  salt: string;
  birthdate?: Date;
  email: string;
  ort?: string;
  beschreibung?: string;
}
