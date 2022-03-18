import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "../../sessionConfig";
import { UserDB } from "../../structure/DB";

export default withIronSessionApiRoute(
  function userRoute(req, res) {
    const { user } = req.session;

    if (!user) {
      res.status(403).send("you need to login");
      return;
    }

    if (req.method === "GET") {
      res.send({ user });
    } else if (req.method === "PATCH") {
      const { apiUrl, apiToken } = req.body;

      if (!req.body) {
        res.status(422).send("you need to give a valid body");
        return;
      }

      const db = new UserDB();

      if (apiUrl != null) {
        db.setApiUrl(user.username, apiUrl);
      } 

      if (apiToken != null) {
        db.setApiToken(user.username, apiToken);
      }

      res.status(200).send("data updated");
    }

    res.status(404).send("invalid");
  },
  ironOptions,
);
