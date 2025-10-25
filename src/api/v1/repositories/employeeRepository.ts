import { FirestoreRepository } from "./firestoreRepository";
import { Employee } from "../models/employeeModel";

export const employeeRepo = new FirestoreRepository<Employee>("employees");
