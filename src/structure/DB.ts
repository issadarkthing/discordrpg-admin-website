import Database from "better-sqlite3";

export interface User {
  id: number;
  username: string;
  password: string;
  apiUrl: string;
}

export class UserDB {
  db = new Database("../../discordrpg.sqlite3");

  constructor() {
    const stmt = this.db.prepare(`
      CREATE TABLE IF NOT EXISTS user (
        id       INTEGER PRIMARY KEY,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        apiUrl   TEXT
      )
    `);

    stmt.run();
  }

  getByUsername(username: string): User | undefined {
    const stmt = this.db.prepare("SELECT * FROM user WHERE username = ?");
    return stmt.get(username);
  }
}
