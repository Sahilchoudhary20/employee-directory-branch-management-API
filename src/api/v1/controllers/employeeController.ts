// src/api/v1/controllers/employeeController.ts
import { Request, Response } from "express";
import * as service from "../services/employeeService";
import { SuccessResponse, ErrorResponse } from "../models/responseModel";
import { Employee } from "../models/employeeModel";

/**
 * Employee controllers: all async, consistent response shapes:
 *  - SuccessResponse<T> { success: true, data: T }
 *  - ErrorResponse { success: false, error: string }
 */

export const create = async (req: Request, res: Response) => {
  try {
    const { name, position, department, email, phone, branchId } = req.body;

    if (!name || !position || !department || !email || !phone || branchId === undefined) {
      const out: ErrorResponse = { success: false, error: "Missing required fields: name, position, department, email, phone, branchId" };
      return res.status(400).json(out);
    }

    const payload: Omit<Employee, "id"> = { name, position, department, email, phone, branchId };
    const created = await service.createEmployee(payload);
    const out: SuccessResponse<Employee> = { success: true, data: created as Employee };
    return res.status(201).json(out);
  } catch (err: any) {
    const out: ErrorResponse = { success: false, error: err?.message ?? "Server error" };
    return res.status(500).json(out);
  }
};

export const getAll = async (_req: Request, res: Response) => {
  try {
    const list = await service.getAllEmployees();
    const out: SuccessResponse<Employee[]> = { success: true, data: list };
    return res.status(200).json(out);
  } catch (err: any) {
    const out: ErrorResponse = { success: false, error: err?.message ?? "Server error" };
    return res.status(500).json(out);
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    // Treat ID as string (Firestore doc IDs are strings); do not parse to number
    const id = String(req.params.id || "").trim();
    if (!id) {
      const out: ErrorResponse = { success: false, error: "Missing or invalid ID parameter" };
      return res.status(400).json(out);
    }

    const emp = await service.getEmployeeById(id);
    if (!emp) {
      const out: ErrorResponse = { success: false, error: "Employee not found" };
      return res.status(404).json(out);
    }

    const out: SuccessResponse<Employee> = { success: true, data: emp };
    return res.status(200).json(out);
  } catch (err: any) {
    const out: ErrorResponse = { success: false, error: err?.message ?? "Server error" };
    return res.status(500).json(out);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id || "").trim();
    if (!id) {
      const out: ErrorResponse = { success: false, error: "Missing or invalid ID parameter" };
      return res.status(400).json(out);
    }

    const patch: Partial<Omit<Employee, "id">> = req.body;
    if (!patch || Object.keys(patch).length === 0) {
      const out: ErrorResponse = { success: false, error: "No fields provided to update" };
      return res.status(400).json(out);
    }

    const updated = await service.updateEmployee(id, patch);
    if (!updated) {
      const out: ErrorResponse = { success: false, error: "Employee not found" };
      return res.status(404).json(out);
    }

    const out: SuccessResponse<Employee> = { success: true, data: updated };
    return res.status(200).json(out);
  } catch (err: any) {
    const out: ErrorResponse = { success: false, error: err?.message ?? "Server error" };
    return res.status(500).json(out);
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id || "").trim();
    if (!id) {
      const out: ErrorResponse = { success: false, error: "Missing or invalid ID parameter" };
      return res.status(400).json(out);
    }

    const ok = await service.deleteEmployee(id);
    if (!ok) {
      const out: ErrorResponse = { success: false, error: "Employee not found" };
      return res.status(404).json(out);
    }

    const out: SuccessResponse<{ message: string }> = { success: true, data: { message: "Deleted" } };
    return res.status(200).json(out);
  } catch (err: any) {
    const out: ErrorResponse = { success: false, error: err?.message ?? "Server error" };
    return res.status(500).json(out);
  }
};

export const byBranch = async (req: Request, res: Response) => {
  try {
    const raw = String(req.params.branchId ?? "").trim();
    if (!raw) {
      const out: ErrorResponse = { success: false, error: "Missing branchId parameter" };
      return res.status(400).json(out);
    }

    // keep branchId as string or number depending on repo/DB
    const branchId: string | number = /^\d+$/.test(raw) ? Number(raw) : raw;

    const list = await service.getEmployeesByBranch(branchId);
    const out: SuccessResponse<Employee[]> = { success: true, data: list };
    return res.status(200).json(out);
  } catch (err: any) {
    const out: ErrorResponse = { success: false, error: err?.message ?? "Server error" };
    return res.status(500).json(out);
  }
};

export const byDepartment = async (req: Request, res: Response) => {
  try {
    const department = String(req.params.department || "").trim();
    if (!department) {
      const out: ErrorResponse = { success: false, error: "Missing department parameter" };
      return res.status(400).json(out);
    }

    const list = await service.getEmployeesByDepartment(department);
    const out: SuccessResponse<Employee[]> = { success: true, data: list };
    return res.status(200).json(out);
  } catch (err: any) {
    const out: ErrorResponse = { success: false, error: err?.message ?? "Server error" };
    return res.status(500).json(out);
  }
};
