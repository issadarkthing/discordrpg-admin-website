import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "../../sessionConfig";

export default withIronSessionApiRoute(
  function logoutRoute(req, res) {
    req.session.destroy();
    res.send({ ok: true });
  },
  ironOptions,
);
