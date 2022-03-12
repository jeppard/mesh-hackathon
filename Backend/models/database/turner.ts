import { RegelmaesigeTermine } from '../../types/DatabaseTypes/regelmaesigeTermine';
import { hasOwnProperty } from '../../util/hasProperty';
import { DatabaseModel } from './database';

export const TurnerModel = new (class extends DatabaseModel<
  { id: number },
  Omit<RegelmaesigeTermine, 'id'>,
  RegelmaesigeTermine
> {
  public get (key: { id: number }): Promise<RegelmaesigeTermine | null> {
    throw new Error('Method not implemented.');
  }

  public insert (
    value: Omit<RegelmaesigeTermine, 'id'>
  ): Promise<RegelmaesigeTermine> {
    throw new Error('Method not implemented.');
  }

  public update (
    value: RegelmaesigeTermine
  ): Promise<RegelmaesigeTermine | null> {
    throw new Error('Method not implemented.');
  }

  public delete (key: { id: number }): Promise<number> {
    throw new Error('Method not implemented.');
  }

  protected transform (obj: unknown): RegelmaesigeTermine {
    if (obj && typeof obj === 'object') {
      if (
        hasOwnProperty(obj, 'id') &&
        typeof obj.id === 'number' &&
        hasOwnProperty(obj, 'activityId') &&
        typeof obj.activityId === 'number' &&
        hasOwnProperty(obj, 'wochentag') &&
        typeof obj.wochentag === 'string' &&
        hasOwnProperty(obj, 'begin') &&
        typeof obj.begin === 'string' &&
        hasOwnProperty(obj, 'ende') &&
        typeof obj.ende === 'string'
      ) {
        return {
          id: obj.id,
          activityId: obj.activityId,
          wochentag: obj.wochentag,
          begin: new Date(obj.begin),
          ende: new Date(obj.ende)
        };
      }
    }
    throw new Error('Method not implemented.');
  }

  public createTable (): Promise<number> {
    return this.run(
      `CREATE TABLE IF NOT EXISTS ${this.tableName}(
          id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
          activityId INTEGER NOT NULL,
          wochentag TEXT NOT NULL,
          begin TEXT NOT NULL,
          ende TEXT NOT NULL
          );`
    );
  }
})('RegelmaesigeTermine');
