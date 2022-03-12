import { DatabaseModel } from './database';
import {
  Kategorie,
  KategoriePrimaryKey
} from '../../types/DatabaseTypes/kategorie';
import { hasOwnProperty } from '../../util/hasProperty';

export const KampfrichterAbzugModel = new (class extends DatabaseModel<
  KategoriePrimaryKey,
  Kategorie,
  Kategorie
> {
  public get (key: KategoriePrimaryKey): Promise<Kategorie | null> {
    throw new Error('Method not implemented.');
  }

  public insert (value: Kategorie): Promise<Kategorie> {
    throw new Error('Method not implemented.');
  }

  public update (value: Kategorie): Promise<Kategorie | null> {
    throw new Error('Method not implemented.');
  }

  public delete (key: KategoriePrimaryKey): Promise<number> {
    throw new Error('Method not implemented.');
  }

  protected transform (obj: unknown): Kategorie {
    if (obj && typeof obj === 'object') {
      if (
        hasOwnProperty(obj, 'id') &&
        typeof obj.id === 'number' &&
        hasOwnProperty(obj, 'name') &&
        typeof obj.name === 'string'
      ) {
        const returnObj: Kategorie = {
          id: obj.id,
          name: obj.name
        };
        if (
          hasOwnProperty(obj, 'ueberkategorie') &&
          typeof obj.ueberkategorie === 'number'
        ) {
          returnObj.ueberkategorie = obj.ueberkategorie;
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
          name TEXT NOT NULL,
          ueberkategorie NULL REFERENCES ${this.tableName}(id)
        );`
    );
  }
})('Kategorie');
