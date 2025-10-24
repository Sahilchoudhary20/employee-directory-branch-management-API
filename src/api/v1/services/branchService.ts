import { branches, Branch } from "../../../data/branches";

export const getAllBranches = (): Branch[] => [...branches];
export const getBranchById = (id: number): Branch | undefined => branches.find(b => b.id === id);
export const createBranch = (payload: Omit<Branch, "id">): Branch => {
  const newId = Math.max(0, ...branches.map(b => b.id)) + 1;
  const branch = { id: newId, ...payload };
  branches.push(branch);
  return branch;
};
export const updateBranch = (id: number, patch: Partial<Omit<Branch,"id">>): Branch | null => {
  const idx = branches.findIndex(b => b.id === id);
  if (idx === -1) return null;
  branches[idx] = { ...branches[idx], ...patch };
  return branches[idx];
};
export const deleteBranch = (id: number): boolean => {
  const idx = branches.findIndex(b => b.id === id);
  if (idx === -1) return false;
  branches.splice(idx, 1);
  return true;
};
