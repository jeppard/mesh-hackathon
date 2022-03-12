import {
  UserActivity,
  UserActivityKey
} from '../../types/DatabaseTypes/userActivity';
import { DatabaseModel } from './database';
import { ActivityModel } from './activity';
import { UserModel } from './user';
import { hasOwnProperty } from '../../util/hasProperty';

export const UserActivityModel = new (class extends DatabaseModel<
  UserActivityKey,
  UserActivity,
  UserActivity
> {
  public get (key: UserActivityKey): Promise<UserActivity | null> {
    throw new Error('Method not implemented.');
  }

  public insert (value: UserActivity): Promise<UserActivity> {
    throw new Error('Method not implemented.');
  }

  public update (value: UserActivity): Promise<UserActivity | null> {
    throw new Error('Method not implemented.');
  }

  public delete (key: UserActivityKey): Promise<number> {
    throw new Error('Method not implemented.');
  }

  protected transform (obj: unknown): UserActivity {
    if (obj && typeof obj === 'object') {
      if (
        hasOwnProperty(obj, 'id') &&
        typeof obj.id === 'number' &&
        hasOwnProperty(obj, 'userId') &&
        typeof obj.userId === 'number' &&
        hasOwnProperty(obj, 'activityId') &&
        typeof obj.activityId === 'number'
      ) {
        return {
          id: obj.id,
          userId: obj.userId,
          activityId: obj.activityId
        };
      }
    }
    throw new Error('Method not implemented.');
  }

  createTable () {
    return this.run(
      `CREATE TABLE IF NOT EXISTS ${this.tableName}(
      id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      userId INTEGER NOT NULL REFERENCES ${UserModel.tableName} ON DELETE DROP,
      activityId INTEGER NOT NULL REFERENCES ${ActivityModel.tableName}
      );`
    );
  }
})('user_activity');
