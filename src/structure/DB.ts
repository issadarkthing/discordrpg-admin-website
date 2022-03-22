import { Pool } from "pg";

export interface User {
  username: string;
  password: string;
  api_url: string;
  api_token: string;
  created_at: Date;
  last_online?: Date;
  last_login?: Date;
  ip?: string;
}

const pool = new Pool({ ssl: false });

export class UserDB {
  db = pool;

  constructor() {
    this.db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id          serial PRIMARY KEY,
        username    TEXT UNIQUE NOT NULL,
        password    TEXT,
        api_url     TEXT,
        api_token   TEXT,
        created_at  TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        last_online TIMESTAMP,
        last_login  TIMESTAMP,
        ip          VARCHAR(15)
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

  async getAllUsers(): Promise<Omit<User, "password">[]> {
    const { rows } = await this.db.query(
      "SELECT * FROM users",
    );

    return rows.map(({ password, ...user }) => user);
  }

  async createUser(user: Omit<User, "created_at">) {
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

  async setLastLogin(username: string, date: Date) {
    await this.db.query(
      "UPDATE users SET last_login = $1 WHERE username = $2",
      [date, username]
    )
  }

  async setLastOnline(username: string, date: Date) {
    await this.db.query(
      "UPDATE users SET last_online = $1 WHERE username = $2",
      [date, username]
    )
  }

  async setIP(username: string, ip: string) {
    await this.db.query(
      "UPDATE users SET ip = $1 WHERE username = $2",
      [ip, username]
    )
  }
}
