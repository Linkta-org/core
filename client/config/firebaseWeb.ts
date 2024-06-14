import { initializeApp } from 'firebase/app';
import { type Auth, getAuth } from 'firebase/auth';
import type { FirebaseConfig } from '@/types/index';

const firebaseConfig: FirebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY!,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.FIREBASE_PROJECT_ID!,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MSG_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID!,
};

if (
  !firebaseConfig.apiKey ||
  !firebaseConfig.authDomain ||
  !firebaseConfig.projectId ||
  !firebaseConfig.appId
) {
  throw new Error(
    'Firebase configuration error: Missing essential configuration values'
  );
}

const firebaseApp = initializeApp(firebaseConfig);
export const auth: Auth = getAuth(firebaseApp);
