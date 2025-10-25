import { employeeRepo } from "../repositories/employeeRepository";
import { Employee } from "../models/employeeModel";

export const createEmployee = async (payload: Omit<Employee, "id">) => {
  const res = await employeeRepo.create(payload as Employee);
  if (!res.success) throw new Error(res.error);
  return res.data as Employee;
};

export const getAllEmployees = async (): Promise<Employee[]> => {
  const res = await employeeRepo.getAll();
  if (!res.success) throw new Error(res.error);
  return (res.data as Employee[]) || [];
};

export const getEmployeeById = async (id: string) => {
  const res = await employeeRepo.getById(id);
  if (!res.success) throw new Error(res.error);
  return res.data as Employee | null;
};

export const updateEmployee = async (id: string, patch: Partial<Employee>) => {
  const res = await employeeRepo.update(id, patch);
  if (!res.success) throw new Error(res.error);
  return res.data as Employee;
};

export const deleteEmployee = async (id: string) => {
  const res = await employeeRepo.delete(id);
  if (!res.success) throw new Error(res.error);
  return true;
};

export const getEmployeesByBranch = async (branchId: string | number) => {
  const res = await employeeRepo.findByField("branchId", branchId);
  if (!res.success) throw new Error(res.error);
  return (res.data as Employee[]) || [];
};

export const getEmployeesByDepartment = async (department: string) => {
  const res = await employeeRepo.findByField("department", department);
  if (!res.success) throw new Error(res.error);
  return (res.data as Employee[]) || [];
};
