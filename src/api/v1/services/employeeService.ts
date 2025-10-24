import { employees, Employee } from "../../../data/employees";

export const getAllEmployees = (): Employee[] => [...employees];

export const getEmployeeById = (id: number): Employee | undefined => employees.find(e => e.id === id);

export const createEmployee = (payload: Omit<Employee, "id">): Employee => {
  const newId = Math.max(0, ...employees.map(e => e.id)) + 1;
  const newEmployee: Employee = { id: newId, ...payload };
  employees.push(newEmployee);
  return newEmployee;
};

export const updateEmployee = (id: number, patch: Partial<Omit<Employee, "id">>): Employee | null => {
  const idx = employees.findIndex(e => e.id === id);
  if (idx === -1) return null;
  employees[idx] = { ...employees[idx], ...patch };
  return employees[idx];
};

export const deleteEmployee = (id: number): boolean => {
  const idx = employees.findIndex(e => e.id === id);
  if (idx === -1) return false;
  employees.splice(idx, 1);
  return true;
};

export const getEmployeesByBranch = (branchId: number): Employee[] =>
  employees.filter(e => e.branchId === branchId);

export const getEmployeesByDepartment = (department: string): Employee[] =>
  employees.filter(e => e.department.toLowerCase() === department.toLowerCase());
