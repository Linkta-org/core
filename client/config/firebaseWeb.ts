import { initializeApp } from 'firebase/app';
import { type Auth, getAuth } from 'firebase/auth';
import type { FirebaseConfig } from '@/client/types/index';

let auth: Auth | undefined;

if (process.env.FIREBASE_API_KEY) {
  const firebaseConfig: FirebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MSG_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
  };

  const firebaseApp = initializeApp(firebaseConfig);
  auth = getAuth(firebaseApp);
} else {
  throw new Error('Missing Firebase API key');
}

export { auth };
