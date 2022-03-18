export const ironOptions = {
  cookieName: "login_c",
  password: process.env.COOKIE_PASSWORD!,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  }
}

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      username: string;
      apiUrl: string;
    }
  }
}
