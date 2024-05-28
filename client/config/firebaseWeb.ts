import { initializeApp } from 'firebase/app';
import { type Auth, getAuth } from 'firebase/auth';
import type { FirebaseConfig } from '@/client/types/index';

const apiKey = process.env.FIREBASE_API_KEY;
const authDomain = process.env.FIREBASE_AUTH_DOMAIN;
const projectId = process.env.FIREBASE_PROJECT_ID;
const appId = process.env.FIREBASE_APP_ID;

if (!apiKey || !authDomain || !projectId || !appId) {
  throw new Error(
    'Firebase configuration error: Missing essential configuration values'
  );
}

const firebaseConfig: FirebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MSG_SENDER_ID,
  appId,
};

const firebaseApp = initializeApp(firebaseConfig);
export const auth: Auth = getAuth(firebaseApp);
