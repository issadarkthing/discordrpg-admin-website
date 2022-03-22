import { withIronSessionApiRoute } from "iron-session/next";
import { adminUsername, ironOptions } from "../../sessionConfig";
import { NextApiRequest, NextApiResponse } from "next";
import { UserDB } from "../../structure/DB";
import { sha256sum } from "../../structure/utils";

export default withIronSessionApiRoute(createRoute, ironOptions);


async function createRoute(req: NextApiRequest, res: NextApiResponse) {

  if (req.method !== "POST") {
    res.status(405).send("unknown method");
    return;
  } else if (req.session.user?.username !== adminUsername) {
    res.status(403).send("unauthorized");
    return;
  }

  const { username, password, apiUrl, apiToken } = req.body;

  if (!username) {
    res.status(422).send("username is required");
    return;
  } else if (!password) {
    res.status(422).send("password is required");
    return;
  } else if (!apiUrl) {
    res.status(422).send("password is required");
    return;
  } else if (!apiToken) {
    res.status(422).send("password is required");
    return;
  }

  const db = new UserDB();

  await db.createUser({ 
    username, 
    password: sha256sum(password), 
    api_url: apiUrl, 
    api_token: apiToken,
  });

  res.send("added new user");
}
