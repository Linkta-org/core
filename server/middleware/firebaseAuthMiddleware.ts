import admin from 'firebase-admin';
import { initializeApp } from 'firebase-admin/app';
import type { Request, Response, NextFunction } from 'express';
import { getEnv } from '@utils/environment';
import log4js from 'log4js';
import type createUserService from '@/services/userService';

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
 * @param {Function} userService - The user service instance.
 * @returns {Function} Middleware function.
 */
const isAuthorized = (userService: ReturnType<typeof createUserService>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const idToken = req.headers.authorization;

    if (!idToken) {
      logger.warn('Authorization header is missing or improperly formatted');
      return res
        .status(401)
        .send('Authorization header is missing or improperly formatted');
    }

    /**
     * If the idToken is valid, the verifyIdToken() method will return a decoded token object.
     * This object contains the user's information, such as their uid and email address.
     */
    try {
      const verification = await admin.auth().verifyIdToken(idToken as string);

      logger.info("User's ID Token successfully verified", {
        verification: verification,
      });

      // Find user by UID
      const user = await userService.findUserByUid(verification.uid);

      if (!user) {
        const { uid, email, name, profilePicture, firebase } = verification;

        res.locals.userData = {
          uid,
          email,
          name,
          profilePicture,
          authProvider: firebase.sign_in_provider,
        };
      } else {
        res.locals.userId = user._id;
      }

      next();
    } catch (error) {
      logger.error(
        'Failed to verify user token or handle user authentication',
        error,
      );
      res.status(401).send('Failed to authenticate the user.');
    }
  };
};

export default isAuthorized;
