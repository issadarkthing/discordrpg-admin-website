import crypto from "crypto";


export function sha256sum(text: string) {
  return crypto.createHash("sha256").update(text).digest("hex");
}
