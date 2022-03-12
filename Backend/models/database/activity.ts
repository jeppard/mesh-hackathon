import { DatabaseModel } from './database';
import { Activity } from '../../types/DatabaseTypes/activity';
import { UserModel } from './user';
import { hasOwnProperty } from '../../util/hasProperty';
export const ActivityModel = new (class extends DatabaseModel<
  { id: number },
  Omit<Activity, 'id'>,
  Activity
> {
  public get (key: { id: number; }): Promise<Activity | null> {
    throw new Error('Method not implemented.');
  }

  public insert (value: Omit<Activity, 'id'>): Promise<Activity> {
    throw new Error('Method not implemented.');
  }

  public update (value: Activity): Promise<Activity | null> {
    throw new Error('Method not implemented.');
  }

  public delete (key: { id: number; }): Promise<number> {
    throw new Error('Method not implemented.');
  }

  protected transform (obj: unknown): Activity {
    if (typeof obj === 'object') {
      if (
        obj &&
        hasOwnProperty(obj, 'id') &&
        typeof obj.id === 'number' &&
        hasOwnProperty(obj, 'name') &&
        typeof obj.name === 'string' &&
        hasOwnProperty(obj, 'ort') &&
        typeof obj.ort === 'string' &&
        hasOwnProperty(obj, 'anfangsdatum') &&
        typeof obj.anfangsdatum === 'string' &&
        hasOwnProperty(obj, 'beschreibung') &&
        typeof obj.beschreibung === 'string' &&
        hasOwnProperty(obj, 'author') &&
        typeof obj.author === 'number'
      ) {
        const returnObj: Activity = {
          id: obj.id,
          name: obj.name,
          ort: obj.ort,
          anfangsdatum: new Date(obj.anfangsdatum),
          beschreibung: obj.beschreibung,
          author: obj.author
        };
        if (hasOwnProperty(obj, 'bild') && typeof obj.bild === 'string') {
          returnObj.bild = obj.bild;
        }
        if (hasOwnProperty(obj, 'enddatum') && typeof obj.enddatum === 'string') {
          returnObj.enddatum = new Date(obj.enddatum);
        }
        return returnObj;
      }
    }
    throw new Error('Obj not in Correct Form');
  }

  public exists (id: number): Promise<boolean> {
    return this.raw(`SELECT id FROM ${this.tableName} WHERE id=? LIMIT 1;`, [
      id
    ]).then((rows) => !!rows.length);
  }

  public createTable (): Promise<number> {
    return this.run(
      `CREATE TABLE IF NOT EXISTS ${this.tableName}(
      id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      ort TEXT NOT NULL,
      anfangsdatum TEXT NOT NULL,
      enddatum TEXT NULL,
      beschreibung TEXT NOT NULL,
      author INTEGER NOT NULL REFERENCES ${UserModel.tableName} ON DELETE CASCADE, TODO
      bild TEXT NULL
      );`
    );
  }
})('Activity');
