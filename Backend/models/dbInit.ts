import { ActivityModel } from './database/activity';
import { KategorieModel } from './database/kategorie';
import { EinzelterminModel } from './database/teilnehmer';
import { RegelmaesigeTermineModel } from './database/turner';
import { ActivityKategorieModel } from './database/aktivityKategorie';
import { UserModel } from './database/user';
import { UserKategorieModel } from './database/userKategorie';
import { UserActivityModel } from './database/userActivity';
import { db } from './db';

export function initDatabase () {
  db.run('PRAGMA foreign_keys = ON;', (err) => {
    if (err) {
      console.error(err);
    } else {
      createTables();
    }
  });
}

export async function createTables () {
  if (process.env.DEV_DROP_TABLES === 'true') {
    await Promise.all([
      RegelmaesigeTermineModel.dropTable(),
      EinzelterminModel.dropTable(),
      ActivityKategorieModel.dropTable(),
      UserActivityModel.dropTable()
    ]);
    console.log('Dropping all Tables...');
    await Promise.all([
      ActivityModel.dropTable(),
      UserKategorieModel.dropTable()
    ]);
    await Promise.all([UserModel.dropTable(), KategorieModel.dropTable()]);
    console.log('Dropped all Tables');
  }
  console.log('Creating Tables...');
  await Promise.all([UserModel.createTable(), KategorieModel.createTable()]);
  await Promise.all([
    ActivityModel.createTable(),
    UserKategorieModel.createTable()
  ]);
  await Promise.all([
    RegelmaesigeTermineModel.createTable(),
    EinzelterminModel.createTable(),
    ActivityKategorieModel.createTable(),
    UserActivityModel.createTable()
  ]);
  console.log('Created all Tables');
}
