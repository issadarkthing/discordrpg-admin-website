"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDB = void 0;
const core_1 = __importDefault(require("@joshdb/core"));
//@ts-ignore
const sqlite_1 = __importDefault(require("@joshdb/sqlite"));
class UserDB {
    constructor() {
        this.db = new core_1.default({
            name: "user",
            provider: sqlite_1.default,
        });
    }
    getByUsername(username) {
        return this.db.get(username);
    }
    createUser(user) {
        return this.db.set(user.username, user);
    }
    async setPassword(username, password) {
        await this.db.update(username, { password });
    }
    async setApiToken(username, token) {
        await this.db.update(username, { api_token: token });
    }
    async setApiUrl(username, apiUrl) {
        await this.db.update(username, { api_url: apiUrl });
    }
}
exports.UserDB = UserDB;
