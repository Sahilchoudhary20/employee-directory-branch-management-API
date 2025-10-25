export interface Employee {
  id?: string; // firestore doc id
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  branchId: string | number;
}
