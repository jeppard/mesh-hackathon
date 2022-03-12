import {
  UserKategorie,
  UserKategorieKey
} from '../../types/DatabaseTypes/userKategorie';
import { hasOwnProperty } from '../../util/hasProperty';
import { DatabaseModel } from './database';
import { KategorieModel } from './kategorie';
import { UserModel } from './user';

export const UserKategorieModel = new (class extends DatabaseModel<
  UserKategorieKey,
  UserKategorie,
  UserKategorie
> {
  public get (key: UserKategorieKey): Promise<UserKategorie | null> {
    throw new Error('Method not implemented.');
  }

  public insert (value: UserKategorie): Promise<UserKategorie> {
    throw new Error('Method not implemented.');
  }

  public update (value: UserKategorie): Promise<UserKategorie | null> {
    throw new Error('Method not implemented.');
  }

  public delete (key: UserKategorieKey): Promise<number> {
    throw new Error('Method not implemented.');
  }

  protected transform (obj: unknown): UserKategorie {
    if (obj && typeof obj === 'object') {
      if (
        hasOwnProperty(obj, 'id') &&
        typeof obj.id === 'number' &&
        hasOwnProperty(obj, 'userId') &&
        typeof obj.userId === 'number' &&
        hasOwnProperty(obj, 'kategorieId') &&
        typeof obj.kategorieId === 'number'
      ) {
        return {
          id: obj.id,
          userId: obj.userId,
          kategorieId: obj.kategorieId
        };
      }
    }
    throw new Error('Method not implemented.');
  }

  createTable () {
    return this.run(
      `CREATE TABLE IF NOT EXISTS ${this.tableName}(
      id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      userId INTEGER NOT NULL REFERENCES ${UserModel.tableName},
      kategorieId INTEGER NOT NULL REFERENCES ${KategorieModel.tableName},
      );`
    );
  }
})('user_kategorie');
