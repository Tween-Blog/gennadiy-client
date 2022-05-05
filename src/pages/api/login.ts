import type { NextApiRequest, NextApiResponse } from 'next';

import axios from 'axios';
import nookies from 'nookies';

import config from '../../config';

export default async function loginHandler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if(req.method == 'POST') {
    try {
      const {email, password} = req.body;

      const response = await axios.post(config.EXPRESS_API_URL + '/login', {email, password});
      const {refreshToken} = response.data;

      const maxAge = 30 * 24 * 60 * 60 * 1000;
      nookies.set({res}, 'refreshToken', refreshToken, {
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