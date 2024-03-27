import { initializeApp } from 'firebase/app';
import { type Auth, getAuth } from 'firebase/auth';

interface FirebaseConfig {
  apiKey: string | undefined;
  authDomain: string | undefined;
  projectId: string | undefined;
  storageBucket: string | undefined;
  messagingSenderId: string | undefined;
  appId: string | undefined;
}

const firebaseConfig: FirebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MSG_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

let auth: Auth;
if (firebaseConfig.apiKey) {
  const firebaseApp = initializeApp(firebaseConfig);
  auth = getAuth(firebaseApp);
} else {
  throw new Error('Missing Firebase API key');
}
export { auth };
