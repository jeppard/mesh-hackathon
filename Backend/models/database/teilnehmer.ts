import {
  Einzeltermin,
  EinzeltermineKey
} from '../../types/DatabaseTypes/einzeltermin';
import { hasOwnProperty } from '../../util/hasProperty';
import { ActivityModel } from './activity';
import { DatabaseModel } from './database';

export const TeilnehmerModel = new (class extends DatabaseModel<
  EinzeltermineKey,
  Einzeltermin,
  Einzeltermin
> {
  public get (key: EinzeltermineKey): Promise<Einzeltermin | null> {
    throw new Error('Method not implemented.');
  }

  public insert (value: Einzeltermin): Promise<Einzeltermin> {
    throw new Error('Method not implemented.');
  }

  public update (value: Einzeltermin): Promise<Einzeltermin | null> {
    throw new Error('Method not implemented.');
  }

  public delete (key: EinzeltermineKey): Promise<number> {
    throw new Error('Method not implemented.');
  }

  protected transform (obj: unknown): Einzeltermin {
    if (obj && typeof obj === 'object') {
      if (
        hasOwnProperty(obj, 'id') &&
        typeof obj.id === 'number' &&
        hasOwnProperty(obj, 'activityId') &&
        typeof obj.activityId === 'number' &&
        hasOwnProperty(obj, 'anfang') &&
        typeof obj.anfang === 'string' &&
        hasOwnProperty(obj, 'ende') &&
        typeof obj.ende === 'string'
      ) {
        return {
          id: obj.id,
          activityId: obj.activityId,
          anfang: new Date(obj.anfang),
          ende: new Date(obj.ende)
        };
      }
    }
    throw new Error('Method not implemented.');
  }

  public createTable (): Promise<number> {
    return this.run(
      `CREATE TABLE IF NOT EXISTS ${this.tableName}(
          id INTEGER NOT PRIMARY KEY AUTOINCREMENT,
          activityId INTEGER NOT NULL REFERENCES ${ActivityModel.tableName},
          anfang TEXT NOT NULL,
          ende TEXT NOT NULL
          );`
    );
  }
})('Einzeltermin');
