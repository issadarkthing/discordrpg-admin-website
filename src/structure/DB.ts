import Josh from "@joshdb/core";
//@ts-ignore
import provider from "@joshdb/sqlite";

export interface User {
  username: string;
  password: string;
  api_url: string;
  api_token: string;
}

export class UserDB {
  db = new Josh({
    name: "user",
    provider,
  });


  getByUsername(username: string): Promise<User | undefined> {
    return this.db.get(username);
  }

  createUser(user: User) {
    return this.db.set(user.username, user);
  }

  async setPassword(username: string, password: string) {
    await this.db.update(username, { password });
  }

  async setApiToken(username: string, token: string) {
    await this.db.update(username, { api_token: token });
  }

  async setApiUrl(username: string, apiUrl: string) {
    await this.db.update(username, { api_url: apiUrl });
  }
}
