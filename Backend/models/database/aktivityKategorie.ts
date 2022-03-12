import {
  ActivityKategorie,
  ActivityKategorieKey
} from '../../types/DatabaseTypes/activityKategorie';
import { hasOwnProperty } from '../../util/hasProperty';
import { ActivityModel } from './activity';
import { DatabaseModel } from './database';
import { KategorieModel } from './kategorie';

export const ActivityKategorieModel = new (class extends DatabaseModel<
  ActivityKategorieKey,
  ActivityKategorie,
  ActivityKategorie
> {
  public get (key: ActivityKategorieKey): Promise<ActivityKategorie | null> {
    throw new Error('Method not implemented.');
  }

  public insert (value: ActivityKategorie): Promise<ActivityKategorie> {
    throw new Error('Method not implemented.');
  }

  public update (value: ActivityKategorie): Promise<ActivityKategorie | null> {
    throw new Error('Method not implemented.');
  }

  public delete (key: ActivityKategorieKey): Promise<number> {
    throw new Error('Method not implemented.');
  }

  protected transform (obj: unknown): ActivityKategorie {
    if (obj && typeof obj === 'object') {
      if (
        hasOwnProperty(obj, 'id') &&
        typeof obj.id === 'number' &&
        hasOwnProperty(obj, 'activityId') &&
        typeof obj.activityId === 'number' &&
        hasOwnProperty(obj, 'kategorieId') &&
        typeof obj.kategorieId === 'number'
      ) {
        return {
          id: obj.id,
          activityId: obj.activityId,
          kategorieId: obj.kategorieId
        };
      }
    }
    throw new Error('Method not implemented.');
  }

  createTable (): Promise<number> {
    return this.run(
      `CREATE TABLE IF NOT EXISTS ${this.tableName}(
      id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      activityId INTEGER NOT NULL REFERENCES ${ActivityModel.tableName},
      kategorieId INTEGER NOT NULL REFERENCES ${KategorieModel.tableName}
    );`
    );
  }
})('ActivityKategorie');
