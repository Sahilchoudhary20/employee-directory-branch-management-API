import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import admin from "firebase-admin";

dotenv.config();



const SERVICE_ACCOUNT_PATH = process.env.FIREBASE_KEY_PATH?.trim();
const EMULATOR_HOST = process.env.FIRESTORE_EMULATOR_HOST?.trim();

let firestoreDb: any = undefined;

try {
  if (SERVICE_ACCOUNT_PATH && fs.existsSync(path.resolve(SERVICE_ACCOUNT_PATH))) {
    const serviceAccount = require(path.resolve(SERVICE_ACCOUNT_PATH));
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
      firestoreDb = admin.firestore();
      console.log("FIREBASE: Admin SDK initialized from service account.");
    }
  } else if (EMULATOR_HOST) {
    if (!admin.apps.length) {
      admin.initializeApp();
      firestoreDb = admin.firestore();
      console.log(`FIREBASE: Admin SDK initialized for emulator at ${EMULATOR_HOST}`);
    }
  } else {
    console.warn("FIREBASE: no service account or emulator configured. Using in-memory fallback DB.");
  }
} catch (err: any) {
  // typed `any` so we can safely access message
  console.error("FIREBASE: initialization error (falling back to in-memory):", err?.message ?? err);
  firestoreDb = undefined;
}

type Doc = { id?: string; [k: string]: any };

const createInMemoryDB = () => {
  const collections = new Map<string, Doc[]>();

  const ensure = (name: string) => {
    if (!collections.has(name)) collections.set(name, []);
    return collections.get(name)!;
  };

  const collection = (name: string) => {
    const arr = ensure(name);

    return {
      add: async (doc: any) => {
        const id = (arr.length + 1).toString();
        const saved = { id, ...doc };
        arr.push(saved);
        return {
          id,
          get: async () => ({ id, data: () => saved }),
        };
      },
      doc: (id: string) => ({
        get: async () => {
          const found = arr.find((d) => String(d.id) === String(id));
          return { exists: !!found, id, data: () => (found ? { ...found } : null) };
        },
        update: async (patch: any) => {
          const idx = arr.findIndex((d) => String(d.id) === String(id));
          if (idx === -1) throw new Error("document-not-found");
          arr[idx] = { ...arr[idx], ...patch };
          return true;
        },
        delete: async () => {
          const idx = arr.findIndex((d) => String(d.id) === String(id));
          if (idx === -1) return false;
          arr.splice(idx, 1);
          return true;
        },
      }),
      get: async () => {
        return { docs: arr.map((d) => ({ id: d.id, data: () => ({ ...d }) })) };
      },
      where: (_field: string, _op: string, value: any) => ({
        get: async () => {
          const docs = arr.filter((d) => Object.values(d).some((v) => v === value));
          return { docs: docs.map((d) => ({ id: d.id, data: () => ({ ...d }) })) };
        },
      }),
    };
  };

  return { collection };
};

const inMemory = createInMemoryDB();

export const db = firestoreDb ?? inMemory;
export { admin };
export default { db };
