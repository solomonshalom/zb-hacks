import * as admin from "firebase-admin";
import { getApps } from "firebase-admin/app";

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY;

if (!getApps().length && projectId && clientEmail && privateKey) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: projectId,
        clientEmail: clientEmail,
        privateKey: privateKey.replace(/\\n/g, "\n"),
      }),
    });
    console.log("✅ Firebase Admin SDK initialized successfully");
  } catch (error) {
    console.error("❌ Firebase Admin SDK initialization failed:", error);
  }
}

const app = getApps()[0];

export const adminDb = app ? admin.firestore() : null as any;
export const adminAuth = app ? admin.auth() : null as any;
