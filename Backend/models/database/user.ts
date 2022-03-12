import { UserDB } from '../../types/DatabaseTypes/user';
import { DatabaseModel } from './database';
import { hasOwnProperty } from '../../util/hasProperty';

export const UserModel = new (class extends DatabaseModel<
  { id: number },
  Omit<UserDB, 'id'>,
  UserDB
> {
  public get (key: { id: number }): Promise<UserDB | null> {
    throw new Error('Method not implemented.');
  }

  public insert (value: Omit<UserDB, 'id'>): Promise<UserDB> {
    throw new Error('Method not implemented.');
  }

  public update (value: UserDB): Promise<UserDB | null> {
    throw new Error('Method not implemented.');
  }

  public delete (key: { id: number }): Promise<number> {
    throw new Error('Method not implemented.');
  }

  protected transform (obj: unknown): UserDB {
    if (obj && typeof obj === 'object') {
      if (
        hasOwnProperty(obj, 'id') &&
        typeof obj.id === 'number' &&
        hasOwnProperty(obj, 'username') &&
        typeof obj.username === 'string' &&
        hasOwnProperty(obj, 'password') &&
        typeof obj.password === 'string' &&
        hasOwnProperty(obj, 'salt') &&
        typeof obj.salt === 'string' &&
        hasOwnProperty(obj, 'email') &&
        typeof obj.email === 'string'
      ) {
        const returnObj: UserDB = {
          id: obj.id,
          username: obj.username,
          password: obj.password,
          salt: obj.salt,
          email: obj.email
        };
        if (hasOwnProperty(obj, 'birthdate') && typeof obj.birthdate === 'string') {
          returnObj.birthdate = new Date(obj.birthdate);
        }
        if (hasOwnProperty(obj, 'ort') && typeof obj.ort === 'string') {
          returnObj.ort = obj.ort;
        }
        if (hasOwnProperty(obj, 'beschreibung') && typeof obj.beschreibung === 'string') {
          returnObj.beschreibung = obj.beschreibung;
        }
        return returnObj;
      }
    }
    throw new Error('Method not implemented.');
  }

  public createTable () {
    return this.run(
      `CREATE TABLE IF NOT EXISTS ${this.tableName}(
      id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      salt TEXT NOT NULL,
      birthdate TEXT NULL,
      email TEXT NOT NULL,
      ort TEXT NULL,
      beschreibung TEXT NULL
    );`
    );
  }
})('appusers');
