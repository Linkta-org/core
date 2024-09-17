import admin from 'firebase-admin';
import { initializeApp } from 'firebase-admin/app';
import type { Request, Response, NextFunction } from 'express';
import { getEnv } from '@utils/environment';
import log4js from 'log4js';
import { UnauthorizedError } from '@/utils/customErrors';

getEnv();

const { getLogger } = log4js;
const logger = getLogger('[USER AUTH]');

/**
 * The developer must create a new private key via the Firebase console
 * then create a local .env file with the following properties
 */
const serviceAccount = {
  projectId: process.env.PROJECT_ID,
  privateKey: process.env.PRIVATE_KEY,
  clientEmail: process.env.CLIENT_EMAIL,
};

initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

/**
 * Middleware to verify Firebase ID token and attach user information to the request object.
 *
 * @returns {Function} Middleware function.
 */
const isAuthorized = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const idToken = req.headers.authorization;

    if (!idToken) {
      logger.warn('Authorization header is missing or improperly formatted');
      return next(new UnauthorizedError());
    }

    /**
     * If the idToken is valid, the verifyIdToken() method will return a decoded token object.
     * This object contains the user's information, such as their Firebase uid.
     */
    try {
      const verifiedToken = await admin.auth().verifyIdToken(idToken as string);
      // res.locals.verifiedToken = verifiedToken;
      res.locals.user = {
        uid: verifiedToken.user_id,
        name: verifiedToken.name,
        profilePicture: verifiedToken.picture,
        authProvider: verifiedToken.firebase.sign_in_provider,
      };

      logger.info("User's ID Token successfully verified", {
        verification: verifiedToken,
        // user: res.locals.user
      });

      next();
    } catch (error) {
      logger.error('Failed to verify user token', error);
      next(new UnauthorizedError('Failed to authenticate the user.'));
    }
  };
};

export default isAuthorized;
