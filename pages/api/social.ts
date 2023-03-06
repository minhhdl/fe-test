// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getSocialDetail } from "@/services/social";
import { ResponseData } from "@/types/Response";
import { SocialData } from "@/types/Social";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData<SocialData>>
) {
  if (req.method === "POST") {
    // Process a POST request
    try {
      const result = await axios.post(
        "https://api.supermomos-dev.com/interview/social",
        req.body
      );
      return res.status(200).json(result.data);
    } catch (e) {
      res.status(400).json({ success: false });
    }
  } else {
    const social = getSocialDetail();
    res.status(200).json({
      success: true,
      data: social,
    });
  }
}
