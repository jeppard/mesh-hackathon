import { db } from '../db';

export abstract class DatabaseModel<
  PrimaryKey,
  InsertType,
  Type extends PrimaryKey & InsertType
> {
  public tableName: string;
  constructor (tableName: string) {
    this.tableName = tableName;
  }

  public dropTable (): Promise<number> {
    console.log('Dropping Table: ' + this.tableName);
    return this.run(`DROP TABLE IF EXISTS ${this.tableName};`);
  }

  public abstract createTable(): Promise<number>;

  public getAll (): Promise<Type[]> {
    return this.all(`SELECT * FROM ${this.tableName};`);
  }

  public abstract get(key: PrimaryKey): Promise<Type | null>;

  public abstract insert(value: InsertType): Promise<Type>;

  public abstract update(value: Type): Promise<Type | null>;

  public abstract delete(key: PrimaryKey): Promise<number>;

  protected abstract transform (obj: unknown): Type;

  protected run (sqlString: string, params?: any[]): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      db.run(sqlString, params, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.changes);
        }
      });
    });
  }

  protected all (sqlString: string, params?: any[]): Promise<Type[]> {
    return new Promise<Type[]>((resolve, reject) => {
      const result: Type[] = [];
      db.each(
        sqlString,
        params,
        (err, row) => {
          if (err) {
            reject(err);
          } else {
            result.push(this.transform(row));
          }
        },
        (err, _count) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  }

  protected one (sqlString: string, params?: any[]): Promise<Type | null> {
    return new Promise<Type | null>((resolve, reject) => {
      db.get(sqlString, params, (err, row) => {
        if (err) {
          reject(err);
        } else {
          if (row) {
            resolve(this.transform(row));
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  protected insertDB (sqlString: string, params?: any[]): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      db.run(sqlString, params, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID);
        }
      });
    });
  }

  protected raw (sqlString: string, params?: any[]): Promise<any[]> {
    return new Promise<any[]>((resolve, reject) => {
      db.all(sqlString, params, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
}
