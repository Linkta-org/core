import * as admin from 'firebase-admin';
import { getServiceAccountEnv } from './environment';
import { Request, Response, NextFunction } from 'express';
import log4js from 'log4js';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';

const { getLogger } = log4js;
const logger = getLogger('[USER AUTH]');

interface WithToken extends Request {
  currentUser: DecodedIdToken
}

getServiceAccountEnv();
const key = process.env.PRIVATE_KEY as string;

admin.initializeApp({
  credential: admin.credential.cert(key)
})

const isAuthorized = async (req: WithToken, _res: Response, next: NextFunction) => {
  const idToken = req.headers.authorization?.split('Bearer ')[1];

  /**
   * If the ID token is valid, the verifyIdToken() method will return a decoded token object.
   * This object contains the user's information, such as their uid and email address.
   */
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken as string);
    req.currentUser = decodedToken;
    next();
  } catch (err) {
    logger.error(err);
    next(err);
  }
}

export default isAuthorized;
