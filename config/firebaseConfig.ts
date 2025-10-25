import admin from "firebase-admin";
import path from "path";

const keyFile = process.env.GOOGLE_APPLICATION_CREDENTIALS || process.env.FIREBASE_KEY_PATH;

if (!admin.apps.length) {
  if (!keyFile) {
   
    console.warn("FIREBASE: no service account path provided. Expect mocks in tests.");
  } else {
    const serviceAccountPath = path.isAbsolute(keyFile) ? keyFile : path.join(process.cwd(), keyFile);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccountPath),
    });
  }
}

const db = admin.firestore();

export default {
  admin,
  db,
};
