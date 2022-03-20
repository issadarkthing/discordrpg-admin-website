import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "../../sessionConfig";
import { NextApiRequest, NextApiResponse } from "next";
import { UserDB } from "../../structure/DB";
import { sha256sum } from "../../structure/utils";

export default withIronSessionApiRoute(loginRoute, ironOptions);


async function loginRoute(req: NextApiRequest, res: NextApiResponse) {

  const { username, password } = req.body;

  if (!username) {
    res.status(422).send("username is required");
    return;
  } else if (!password) {
    res.status(422).send("password is required");
    return;
  }

  const session = req.session;
  const db = new UserDB();
  const user = await db.getByUsername(username);

  if (!user) {
    res.status(404).send("cannot find user");
    return;
  } else if (user.password !== sha256sum(password)) {
    res.status(403).send("invalid password");
    return;
  }

  session.user = { 
    username: user.username,
    apiUrl: user.api_url,
    apiToken: user.api_token,
  };

  await req.session.save();
  res.send("logged in");
}
