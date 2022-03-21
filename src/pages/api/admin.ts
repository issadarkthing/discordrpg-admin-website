import { withIronSessionApiRoute } from "iron-session/next"
import { NextApiRequest, NextApiResponse } from "next";
import { ironOptions } from "../../sessionConfig";
import { UserDB } from "../../structure/DB";


export default withIronSessionApiRoute(adminRoute, ironOptions);

async function adminRoute(req: NextApiRequest, res: NextApiResponse) {

  if (req.method !== "GET") {
    res.status(405).send("unknown method");
    return;
  } else if (req.session.user?.username !== "raziman") {
    res.status(403).send("unauthorized");
    return;
  }

  const db = new UserDB();
  const users = await db.getAllUsers();
  
  res.json(users);
}

