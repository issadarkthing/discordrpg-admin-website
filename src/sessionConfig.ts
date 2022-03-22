
export const adminUsername = "raziman";

export const ironOptions = {
  cookieName: "login_c",
  password: process.env.COOKIE_PASSWORD!,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  }
}

export interface User {
  username: string;
  apiUrl: string;
  apiToken: string;
}

declare module "iron-session" {
  interface IronSessionData {
    user?: User;
  }
}


