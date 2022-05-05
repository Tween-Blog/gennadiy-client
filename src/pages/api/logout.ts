import type { NextApiRequest, NextApiResponse } from 'next';

import axios from 'axios';
import nookies from 'nookies';

import config from '../../config';

export default async function logoutHandler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if(req.method == 'GET') {
    try {
      const refreshToken = req.cookies.refreshToken;

      const response = await axios.post(config.EXPRESS_API_URL + '/logout', {refreshToken});
      nookies.destroy({res}, 'refreshToken', {path: '/'});

      res.json(response.data);
    } catch (e: any) {
        res.status(400).json(e.response.data);
    }
  }
}