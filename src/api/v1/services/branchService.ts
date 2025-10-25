// src/api/v1/services/branchService.ts
import { Branch } from "../models/branchModel";
import { branchRepo } from "../repositories/branchRepository";

/**
 * Branch service - unwraps repository results and returns raw
 * Branch objects (or booleans) as tests/controllers expect.
 */

export const getAllBranches = async (): Promise<Branch[]> => {
  const res = await branchRepo.getAll();
  if (!res.success) throw new Error(res.error || "Failed to fetch branches");
  return (res.data as Branch[]) || [];
};

export const getBranchById = async (id: string): Promise<Branch | null> => {
  const res = await branchRepo.getById(id);
  if (!res.success) throw new Error(res.error || "Failed to fetch branch");
  return (res.data as Branch) || null;
};

export const createBranch = async (payload: Omit<Branch, "id">): Promise<Branch> => {
  const res = await branchRepo.create(payload as Branch);
  if (!res.success) throw new Error(res.error || "Failed to create branch");
  return res.data as Branch;
};

export const updateBranch = async (id: string, patch: Partial<Omit<Branch, "id">>): Promise<Branch | null> => {
  const res = await branchRepo.update(id, patch as Partial<Branch>);
  if (!res.success) throw new Error(res.error || "Failed to update branch");
  return (res.data as Branch) || null;
};

export const deleteBranch = async (id: string): Promise<boolean> => {
  const res = await branchRepo.delete(id);
  if (!res.success) throw new Error(res.error || "Failed to delete branch");
  return true;
};
