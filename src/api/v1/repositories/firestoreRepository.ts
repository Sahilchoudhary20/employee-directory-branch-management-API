import { firestore } from "firebase-admin";
import { db } from "../../../../config/firebaseConfig";


export interface RepositoryResult<T> {
  success: boolean;
  data?: T | T[] | null;
  error?: string;
}

export class FirestoreRepository<T extends { id?: string | number }> {
  private collection: firestore.CollectionReference<firestore.DocumentData>;

  constructor(collectionName: string) {
    this.collection = db.collection(collectionName);
  }

  async create(doc: Omit<T, "id">): Promise<RepositoryResult<T>> {
    try {
      const ref = await this.collection.add(doc as firestore.DocumentData);
      const snapshot = await ref.get();
      const data = snapshot.data() as T;
      return { success: true, data: { ...(data as any), id: ref.id } as unknown as T };
    } catch (err: any) {
      return { success: false, error: err.message ?? String(err) };
    }
  }

  async getAll(): Promise<RepositoryResult<T>> {
    try {
      const snap = await this.collection.get();
      const items = snap.docs.map(d => ({ ...(d.data() as T), id: d.id } as unknown as T));
      return { success: true, data: items };
    } catch (err: any) {
      return { success: false, error: err.message ?? String(err) };
    }
  }

  async getById(id: string): Promise<RepositoryResult<T>> {
    try {
      const doc = await this.collection.doc(id).get();
      if (!doc.exists) return { success: true, data: null };
      return { success: true, data: { ...(doc.data() as T), id: doc.id } as unknown as T };
    } catch (err: any) {
      return { success: false, error: err.message ?? String(err) };
    }
  }

  async update(id: string, patch: Partial<T>): Promise<RepositoryResult<T>> {
    try {
      const ref = this.collection.doc(id);
      await ref.update(patch as FirebaseFirestore.UpdateData<T>);
      const updated = await ref.get();
      return { success: true, data: { ...(updated.data() as T), id: updated.id } as unknown as T };
    } catch (err: any) {
      return { success: false, error: err.message ?? String(err) };
    }
  }

  async delete(id: string): Promise<RepositoryResult<null>> {
    try {
      await this.collection.doc(id).delete();
      return { success: true, data: null };
    } catch (err: any) {
      return { success: false, error: err.message ?? String(err) };
    }
  }

  // Additional query helper: find by field equal
  async findByField(field: string, value: any): Promise<RepositoryResult<T>> {
    try {
      const snap = await this.collection.where(field, "==", value).get();
      const items = snap.docs.map(d => ({ ...(d.data() as T), id: d.id } as unknown as T));
      return { success: true, data: items };
    } catch (err: any) {
      return { success: false, error: err.message ?? String(err) };
    }
  }
}
