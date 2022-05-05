import type { NextApiRequest, NextApiResponse } from 'next';

import axios from 'axios';
import nookies from 'nookies';

import config from '../../config';

export default async function refreshHandler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if(req.method == 'GET') {
    try {
      const oldRefreshToken = req.cookies.refreshToken;

      const response = await axios.post(config.EXPRESS_API_URL + '/refresh', {refreshToken: oldRefreshToken});
      const newRefreshToken = response.data.refreshToken;

      const maxAge = 30 * 24 * 60 * 60 * 1000;
      nookies.set({res}, 'refreshToken', newRefreshToken, {
        maxAge,
        secure: true,
        httpOnly: true,
        sameSite: 'none',
        path: '/'
      });

      res.json(response.data);
    } catch (e: any) {
      res.status(400).json(e.response.data);
    }
  }
}