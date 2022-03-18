import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "../../sessionConfig";
import type { IronSession } from "iron-session";
import { NextApiRequest, NextApiResponse } from "next";
import { UserDB } from "../../structure/DB";

export default withIronSessionApiRoute(loginRoute, ironOptions);

export interface User {
  username: string;
  apiUrl?: string;
}

export interface UserSession extends IronSession {
  user: User;
}

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {

  const { username, password } = req.body;

  if (!username) {
    res.status(422).send("username is required");
    return;
  } else if (!password) {
    res.status(422).send("password is required");
    return;
  }

  const session = req.session as UserSession;
  const db = new UserDB();
  const user = db.getByUsername(username);

  if (!user) {
    res.status(404).send("cannot find user");
    return;
  }

  session.user = { 
    username: user.username,
    apiUrl: user.apiUrl,
  };

  await req.session.save();
  res.send("logged in");
}
