import { Request, Response } from "express";
import * as service from "../services/branchService";

export const create = (req: Request, res: Response) => {
  const { name, address, phone } = req.body;
  if (!name || !address || !phone) return res.status(400).json({ message: "Missing required fields" });
  const created = service.createBranch({ name, address, phone });
  return res.status(201).json(created);
};

export const getAll = (_req: Request, res: Response) => res.status(200).json(service.getAllBranches());
export const getById = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (!id) return res.status(400).json({ message: "Invalid ID" });
  const branch = service.getBranchById(id);
  if (!branch) return res.status(404).json({ message: "Branch not found" });
  return res.status(200).json(branch);
};
export const update = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const updated = service.updateBranch(id, req.body);
  if (!updated) return res.status(404).json({ message: "Branch not found" });
  return res.status(200).json(updated);
};
export const remove = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const ok = service.deleteBranch(id);
  if (!ok) return res.status(404).json({ message: "Branch not found" });
  return res.status(200).json({ message: "Deleted" });
};
