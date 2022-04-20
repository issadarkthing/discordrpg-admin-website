import { withIronSessionApiRoute } from "iron-session/next"
import { NextApiRequest, NextApiResponse } from "next";
import { ironOptions } from "../../../sessionConfig";

export default withIronSessionApiRoute(requestRoute, ironOptions);

// route to call external API
// /request/player
async function requestRoute(req: NextApiRequest, res: NextApiResponse) {

  if (!req.session.user) {
    res.status(403).send("you need to login");
    return;
  }

  const { apiUrl, apiToken } = req.session.user;
  const cleanApiUrl = apiUrl.replace(/\/$/, ""); // remove trailing backslash
  const path = req.url!.replace(/^.*\/request/, ""); // remove "*/request" prefix
  const url = `${cleanApiUrl}${path}`;

  const response = await fetch(url, { 
    method: req.method,
    headers: {
      "Authorization": `token ${apiToken}`
    }
  });

  if (!response.ok) {
    res.send(await response.text());
  } else {
    res.json(await response.json());
  }
}

