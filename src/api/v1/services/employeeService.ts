// src/api/v1/services/employeeService.ts
import { Employee } from "../models/employeeModel";
import { employeeRepo } from "../repositories/employeeRepository";

export const getAllEmployees = async (): Promise<Employee[]> => {
  const res = await employeeRepo.getAll();
  if (!res.success) throw new Error(res.error || "Failed to fetch employees");
  return (res.data as Employee[]) || [];
};

export const getEmployeeById = async (id: string): Promise<Employee | null> => {
  const res = await employeeRepo.getById(id);
  if (!res.success) throw new Error(res.error || "Failed to fetch employee");
  return (res.data as Employee) || null;
};

export const createEmployee = async (payload: Omit<Employee, "id">): Promise<Employee> => {
  const res = await employeeRepo.create(payload as Employee);
  if (!res.success) throw new Error(res.error || "Failed to create employee");
  return res.data as Employee;
};

export const updateEmployee = async (id: string, patch: Partial<Omit<Employee, "id">>): Promise<Employee | null> => {
  const res = await employeeRepo.update(id, patch as Partial<Employee>);
  if (!res.success) throw new Error(res.error || "Failed to update employee");
  return (res.data as Employee) || null;
};

export const deleteEmployee = async (id: string): Promise<boolean> => {
  const res = await employeeRepo.delete(id);
  if (!res.success) throw new Error(res.error || "Failed to delete employee");
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
