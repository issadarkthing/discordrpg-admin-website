import { Pool } from "pg";

export interface User {
  username: string;
  password: string;
  api_url: string;
  api_token: string;
}

const pool = new Pool({ ssl: false });

export class UserDB {
  db = pool;

  constructor() {
    this.db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id        serial PRIMARY KEY,
        username  TEXT UNIQUE NOT NULL,
        password  TEXT,
        api_url   TEXT,
        api_token TEXT
      )
    `);
  }

  async getByUsername(username: string): Promise<User | undefined> {
    const { rows } = await this.db.query(
      "SELECT * FROM users WHERE username = $1", 
      [username]
    );

    return rows[0];
  }

  async createUser(user: User) {
    await this.db.query(
      "INSERT INTO users (username, password, api_url, api_token) VALUES ($1, $2, $3, $4)",
      [user.username, user.password, user.api_url, user.api_token]
    );
  }

  async setPassword(username: string, password: string) {
    await this.db.query(
      "UPDATE users SET password = $1 WHERE username = $2", 
      [password, username]
    );
  }

  async setApiToken(username: string, token: string) {
    await this.db.query(
      "UPDATE users SET api_token = $1 WHERE username = $2", 
      [token, username]
    );
  }

  async setApiUrl(username: string, apiUrl: string) {
    await this.db.query(
      "UPDATE users SET api_url = $1 WHERE username = $2", 
      [apiUrl, username]
    );
  }
}
