import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore, initializeFirestore, persistentLocalCache } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

/** @param {Record<string, string | undefined>} config */
function assertFirebaseConfig(config) {
  const missingKeys = Object.entries(config)
    .filter(([, value]) => !value)
    .map(([key]) => key);

  if (missingKeys.length > 0) {
    throw new Error(
      `Faltan variables de entorno de Firebase en .env (VITE_FIREBASE_*): ${missingKeys.join(', ')}`,
    );
  }
}

assertFirebaseConfig(firebaseConfig);

export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

/** @returns {import('firebase/firestore').Firestore} */
function createFirestoreInstance() {
  try {
    return initializeFirestore(app, {
      localCache: persistentLocalCache({}),
    });
  } catch {
    return getFirestore(app);
  }
}

export const db = createFirestoreInstance();
