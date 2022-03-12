// import { Database } from 'sqlite3';
import sqlite3 from 'sqlite3';

const sqlite = sqlite3.verbose();

export const db = new sqlite.Database('./databases/db.sqlite', (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Connected to SQLITE');
  }
});
