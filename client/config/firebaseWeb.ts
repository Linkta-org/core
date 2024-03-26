import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Linkta web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: 'linkta-prod.firebaseapp.com',
  projectId: 'linkta-prod',
  storageBucket: 'linkta-prod.appspot.com',
  messagingSenderId: process.env.FIREBASE_MSG_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(firebaseApp);
