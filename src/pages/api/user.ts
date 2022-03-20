import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "../../sessionConfig";
import { UserDB } from "../../structure/DB";

export default withIronSessionApiRoute(
  async function userRoute(req, res) {

    if (!req.session.user) {
      res.status(403).send("you need to login");
      return;
    }

    const db = new UserDB();
    const user = await db.getByUsername(req.session.user.username);

    if (!user) {
      res.status(404).send("cannot find user");
      return;
    }

    if (req.method === "GET") {
      res.send({ 
        username: user.username,
        apiUrl: user.api_url,
        apiToken: user.api_token,
      });

      return;

    } else if (req.method === "PATCH") {
      const { apiUrl, apiToken } = req.body;

      if (!req.body) {
        res.status(422).send("you need to give a valid body");
        return;
      }

      if (apiUrl != null) {
        db.setApiUrl(user.username, apiUrl);
        req.session.user.apiUrl = apiUrl;
      } 

      if (apiToken != null) {
        db.setApiToken(user.username, apiToken);
        req.session.user.apiToken = apiToken;
      }

      await req.session.save();

      res.status(200).send("data updated");
      return;
    }

    res.status(404).send("invalid");
  },
  ironOptions,
);
