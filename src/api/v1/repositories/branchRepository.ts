import { FirestoreRepository } from "./firestoreRepository";
import { Branch } from "../models/branchModel";

export const branchRepo = new FirestoreRepository<Branch>("branches");
