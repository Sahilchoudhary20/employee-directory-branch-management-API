import { Request, Response } from "express";
import * as service from "../services/employeeService";

export const create = (req: Request, res: Response) => {
  const { name, position, department, email, phone, branchId } = req.body;
  if (!name || !position || !department || !email || !phone || !branchId) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  const created = service.createEmployee({ name, position, department, email, phone, branchId });
  return res.status(201).json(created);
};

export const getAll = (_req: Request, res: Response) => {
  return res.status(200).json(service.getAllEmployees());
};

export const getById = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (!id) return res.status(400).json({ message: "Invalid ID" });
  const emp = service.getEmployeeById(id);
  if (!emp) return res.status(404).json({ message: "Employee not found" });
  return res.status(200).json(emp);
};

export const update = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const patch = req.body;
  if (!id) return res.status(400).json({ message: "Invalid ID" });
  const updated = service.updateEmployee(id, patch);
  if (!updated) return res.status(404).json({ message: "Employee not found" });
  return res.status(200).json(updated);
};

export const remove = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (!id) return res.status(400).json({ message: "Invalid ID" });
  const ok = service.deleteEmployee(id);
  if (!ok) return res.status(404).json({ message: "Employee not found" });
  return res.status(200).json({ message: "Deleted" });
};

export const byBranch = (req: Request, res: Response) => {
  const branchId = Number(req.params.branchId);
  if (!branchId) return res.status(400).json({ message: "Invalid branchId" });
  return res.status(200).json(service.getEmployeesByBranch(branchId));
};

export const byDepartment = (req: Request, res: Response) => {
  const department = String(req.params.department || "");
  if (!department) return res.status(400).json({ message: "Invalid department" });
  return res.status(200).json(service.getEmployeesByDepartment(department));
};
