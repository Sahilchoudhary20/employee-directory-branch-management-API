import { Router } from "express";
import * as ctrl from "../controllers/employeeController";
import { validateBody } from "../middleware/validate";
import { createEmployeeSchema, updateEmployeeSchema } from "../validation/employeeSchema";

const router = Router();

router.post("/", validateBody(createEmployeeSchema), ctrl.create);
router.get("/", ctrl.getAll);
router.get("/branch/:branchId", ctrl.byBranch);
router.get("/department/:department", ctrl.byDepartment);
router.get("/:id", ctrl.getById);
router.put("/:id", validateBody(updateEmployeeSchema), ctrl.update);
router.delete("/:id", ctrl.remove);

export default router;
