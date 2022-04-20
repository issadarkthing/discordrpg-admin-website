import { withIronSessionApiRoute } from "iron-session/next"
import { NextApiRequest, NextApiResponse } from "next";
import { ironOptions } from "../../sessionConfig";
import { join } from "path";

export default withIronSessionApiRoute(requestRoute, ironOptions);

// route to call external API
// /request/player
async function requestRoute(req: NextApiRequest, res: NextApiResponse) {

  if (!req.session.user) {
    res.status(403).send("you need to login");
    return;
  }

  const { apiUrl, apiToken } = req.session.user;
  const path = apiUrl.replace(/^.*\/request/, "");
  const url = join(apiUrl, path);
  
  const response = await fetch(url, { 
    method: req.method,
    headers: {
      "Authorization": `token ${apiToken}`
    }
  });

  res.send(response);
}

