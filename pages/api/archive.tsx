import { NextApiRequest, NextApiResponse } from "next";

export default function handle(_req: NextApiRequest, res: NextApiResponse) {
  res.json({ archive: true });
}
