import { Router } from "express";
import * as ctrl from "../controllers/branchController";
import { validateBody } from "../middleware/validate";
import { createBranchSchema, updateBranchSchema } from "../validation/branchSchema";

const router = Router();


router.post("/", validateBody(createBranchSchema), ctrl.create);
router.get("/", ctrl.getAll);
router.get("/:id", ctrl.getById);
router.put("/:id", validateBody(updateBranchSchema), ctrl.update);
router.delete("/:id", ctrl.remove);

export default router;
