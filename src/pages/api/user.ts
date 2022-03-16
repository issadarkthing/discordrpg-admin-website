import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "../../sessionConfig";
import type { UserSession } from "./login";

export default withIronSessionApiRoute(
  function userRoute(req, res) {
    const session = req.session as UserSession;
    res.send({ user: session.user });
  },
  ironOptions,
);
