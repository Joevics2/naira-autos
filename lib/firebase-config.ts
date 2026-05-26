import { initializeApp, getApp, getApps } from 'firebase/app';
import { getMessaging, getToken, onMessage, isSupported } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '',
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const requestNotificationPermission = async () => {
  try {
    const supported = await isSupported();
    if (!supported) {
      console.log('Firebase Messaging is not supported in this browser');
      return null;
    }

    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const messaging = getMessaging(app);
      const token = await getToken(messaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY || '',
      });
      return token;
    }
    return null;
  } catch (error) {
    console.error('Error requesting notification permission:', error);
    return null;
  }
};

export const onMessageListener = async () => {
  try {
    const supported = await isSupported();
    if (!supported) {
      return new Promise(() => {});
    }

    const messaging = getMessaging(app);
    return new Promise((resolve) => {
      onMessage(messaging, (payload) => {
        resolve(payload);
      });
    });
  } catch (error) {
    console.error('Error setting up message listener:', error);
    return new Promise(() => {});
  }
};
