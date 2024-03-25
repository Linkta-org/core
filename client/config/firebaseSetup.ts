import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Linkta web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyC8E8SFfC-coXYSjFiqoDdtFf_0imHvMrY',
  authDomain: 'linkta-prod.firebaseapp.com',
  projectId: 'linkta-prod',
  storageBucket: 'linkta-prod.appspot.com',
  messagingSenderId: '53706722050',
  appId: '1:53706722050:web:0838b30c53273791a1501b',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(firebaseApp);
