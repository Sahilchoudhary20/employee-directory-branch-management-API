import { Request, Response } from "express";
import * as service from "../services/employeeService";
import { SuccessResponse, ErrorResponse } from "../models/responseModel";

// Create new employee
export const create = async (req: Request, res: Response) => {
  try {
    const created = await service.createEmployee(req.body);
    const out: SuccessResponse<typeof created> = { success: true, data: created };
    return res.status(201).json(out);
  } catch (err: any) {
    const out: ErrorResponse = { success: false, error: err.message || "Server error" };
    return res.status(500).json(out);
  }
};

// Get all employees
export const getAll = async (req: Request, res: Response) => {
  try {
    const employees = await service.getAllEmployees();
    const out: SuccessResponse<typeof employees> = { success: true, data: employees };
    return res.status(200).json(out);
  } catch (err: any) {
    const out: ErrorResponse = { success: false, error: err.message || "Server error" };
    return res.status(500).json(out);
  }
};

// Get employee by ID
export const getById = async (req: Request, res: Response) => {
  try {
    const employee = await service.getEmployeeById(req.params.id);
    if (!employee) {
      return res.status(404).json({ success: false, error: "Employee not found" });
    }
    const out: SuccessResponse<typeof employee> = { success: true, data: employee };
    return res.status(200).json(out);
  } catch (err: any) {
    const out: ErrorResponse = { success: false, error: err.message || "Server error" };
    return res.status(500).json(out);
  }
};

// Update employee
export const update = async (req: Request, res: Response) => {
  try {
    const updated = await service.updateEmployee(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, error: "Employee not found" });
    }
    const out: SuccessResponse<typeof updated> = { success: true, data: updated };
    return res.status(200).json(out);
  } catch (err: any) {
    const out: ErrorResponse = { success: false, error: err.message || "Server error" };
    return res.status(500).json(out);
  }
};

// Delete employee
export const remove = async (req: Request, res: Response) => {
  try {
    const deleted = await service.deleteEmployee(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, error: "Employee not found" });
    }
    const out: SuccessResponse<{ id: string }> = { success: true, data: { id: req.params.id } };
    return res.status(200).json(out);
  } catch (err: any) {
    const out: ErrorResponse = { success: false, error: err.message || "Server error" };
    return res.status(500).json(out);
  }
};

// Get employees by branch
export const byBranch = async (req: Request, res: Response) => {
  try {
    const employees = await service.getEmployeesByBranch(req.params.branchId);
    const out: SuccessResponse<typeof employees> = { success: true, data: employees };
    return res.status(200).json(out);
  } catch (err: any) {
    const out: ErrorResponse = { success: false, error: err.message || "Server error" };
    return res.status(500).json(out);
  }
};

// Get employees by department
export const byDepartment = async (req: Request, res: Response) => {
  try {
    const employees = await service.getEmployeesByDepartment(req.params.departmentId);
    const out: SuccessResponse<typeof employees> = { success: true, data: employees };
    return res.status(200).json(out);
  } catch (err: any) {
    const out: ErrorResponse = { success: false, error: err.message || "Server error" };
    return res.status(500).json(out);
  }
};
