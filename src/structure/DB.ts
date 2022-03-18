import Database from "better-sqlite3";

export interface User {
  id: number;
  username: string;
  password: string;
  api_url: string;
  api_token: string;
}

export class UserDB {
  db = new Database("discordrpg.sqlite3");

  constructor() {
    const stmt = this.db.prepare(`
      CREATE TABLE IF NOT EXISTS user (
        id        INTEGER PRIMARY KEY,
        username  TEXT NOT NULL UNIQUE,
        password  TEXT NOT NULL,
        api_url   TEXT,
        api_token TEXT
      )
    `);

    stmt.run();
  }

  getByUsername(username: string): User | undefined {
    const stmt = this.db.prepare("SELECT * FROM user WHERE username = ?");
    return stmt.get(username);
  }

  setPassword(username: string, password: string) {
    const stmt = this.db.prepare("UPDATE user SET password = ? WHERE username = ?");
    stmt.run(username, password);
  }

  setApiToken(username: string, token: string) {
    const stmt = this.db.prepare("UPDATE user SET api_token = ? WHERE username = ?");
    stmt.run(username, token);
  }

  setApiUrl(username: string, apiUrl: string) {
    const stmt = this.db.prepare("UPDATE user SET api_url = ? WHERE username = ?");
    stmt.run(username, apiUrl);
  }
}
