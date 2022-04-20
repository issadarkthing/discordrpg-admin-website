import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "../../sessionConfig";

export default withIronSessionApiRoute(
  function logoutRoute(req, res) {

    if (req.method !== "POST") {
      res.status(400).send("invalid method");
      return;
    }

    req.session.destroy();
    res.send({ ok: true });
  },
  ironOptions,
);
