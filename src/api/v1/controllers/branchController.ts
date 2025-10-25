// src/api/v1/controllers/branchController.ts
import { Request, Response } from "express";
import * as service from "../services/branchService";
import { SuccessResponse, ErrorResponse } from "../models/responseModel";
import { Branch } from "../models/branchModel";

/**
 * Branch controllers: async handlers that call service layer and return
 * consistent response shapes.
 */

export const create = async (req: Request, res: Response) => {
  try {
    const { name, address, phone } = req.body;
    if (!name || !address || !phone) {
      const out: ErrorResponse = { success: false, error: "Missing required fields: name, address, phone" };
      return res.status(400).json(out);
    }

    const created = await service.createBranch({ name, address, phone });
    const out: SuccessResponse<Branch> = { success: true, data: created };
    return res.status(201).json(out);
  } catch (err: any) {
    const out: ErrorResponse = { success: false, error: err?.message ?? "Server error" };
    return res.status(500).json(out);
  }
};

export const getAll = async (_req: Request, res: Response) => {
  try {
    const list = await service.getAllBranches();
    const out: SuccessResponse<Branch[]> = { success: true, data: list };
    return res.status(200).json(out);
  } catch (err: any) {
    const out: ErrorResponse = { success: false, error: err?.message ?? "Server error" };
    return res.status(500).json(out);
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    // keep id as string
    const id = String(req.params.id || "").trim();
    if (!id) {
      const out: ErrorResponse = { success: false, error: "Missing or invalid ID parameter" };
      return res.status(400).json(out);
    }

    const branch = await service.getBranchById(id);
    if (!branch) {
      const out: ErrorResponse = { success: false, error: "Branch not found" };
      return res.status(404).json(out);
    }

    const out: SuccessResponse<Branch> = { success: true, data: branch };
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

    const patch: Partial<Omit<Branch, "id">> = req.body;
    if (!patch || Object.keys(patch).length === 0) {
      const out: ErrorResponse = { success: false, error: "No fields provided to update" };
      return res.status(400).json(out);
    }

    const updated = await service.updateBranch(id, patch);
    if (!updated) {
      const out: ErrorResponse = { success: false, error: "Branch not found" };
      return res.status(404).json(out);
    }

    const out: SuccessResponse<Branch> = { success: true, data: updated };
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

    const ok = await service.deleteBranch(id);
    if (!ok) {
      const out: ErrorResponse = { success: false, error: "Branch not found" };
      return res.status(404).json(out);
    }

    const out: SuccessResponse<{ message: string }> = { success: true, data: { message: "Deleted" } };
    return res.status(200).json(out);
  } catch (err: any) {
    const out: ErrorResponse = { success: false, error: err?.message ?? "Server error" };
    return res.status(500).json(out);
  }
};
