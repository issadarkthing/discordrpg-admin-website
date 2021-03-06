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

  const headers: any = {
    "Authorization": `token ${apiToken}`,
  };

  if (req.body) {
    headers["Content-Type"] = "application/json";
  }

  const init: RequestInit = {
    method: req.method,
    headers,
  }

  if (req.method !== "GET" && req.method !== "HEAD") {
    init.body = JSON.stringify(req.body);
  }

  const response = await fetch(url, init);

  if (!response.ok) {
    res.status(response.status).send(await response.text());
  } else {
    res.status(response.status).json(await response.json());
  }
}

