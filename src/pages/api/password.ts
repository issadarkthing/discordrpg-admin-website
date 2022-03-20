import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { ironOptions } from "../../sessionConfig";
import { UserDB } from "../../structure/DB";
import { sha256sum } from "../../structure/utils";



export default withIronSessionApiRoute(passwordHandler, ironOptions);

async function passwordHandler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method !== "PATCH") {
    res.status(405).send("invalid method");
    return;
  }

  const sessionUser = req.session.user;

  if (!sessionUser) {
    res.status(401).send("you must be logged in first");
    return
  }
  
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword) {
    res.status(422).send("old password is required");
    return;
  } else if (!newPassword) {
    res.status(422).send("new password is required");
    return;
  }

  const db = new UserDB();
  const user = await db.getByUsername(sessionUser.username);

  if (!user) {
    res.status(404).send("cannot find user");
    return;
  } else if (user.password !== sha256sum(oldPassword)) {
    res.status(403).send("invalid password");
    return;
  } else if (oldPassword === newPassword) {
    res.status(400).send("old password cannot be the same as old password");
    return;
  } else if (newPassword.length < 8) {
    res.status(400).send("new password cannot be less than 8 characters");
    return;
  }

  db.setPassword(sessionUser.username, sha256sum(newPassword));
  
  res.status(200).send("password updated successfully");
}
