import { withIronSessionApiRoute } from "iron-session/next"
import { NextApiRequest, NextApiResponse } from "next";
import { adminUsername, ironOptions } from "../../sessionConfig";
import { UserDB } from "../../structure/DB";


export default withIronSessionApiRoute(adminRoute, ironOptions);

async function adminRoute(req: NextApiRequest, res: NextApiResponse) {

  if (req.method !== "GET") {
    res.status(405).send("unknown method");
    return;
  } else if (req.session.user?.username !== adminUsername) {
    res.status(403).send("unauthorized");
    return;
  }

  const db = new UserDB();
  await db.connect();

  try {
    const users = await db.getAllUsers();
    res.json(users);
  } finally {
    db.release();
  }
  
}

