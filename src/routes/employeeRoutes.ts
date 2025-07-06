// File: server/routes/employeeRoutes.ts
import express from "express";
import * as employeeController from "../controllers/employeeController";

const router = express.Router();

// ✅ Clean and RESTful paths (no duplicate /employees)
router.get("/", employeeController.getAllEmployees);
router.post("/", employeeController.addEmployee);
// router.get("/stats", employeeController.getEmployeeStats);
router.get("/recent", employeeController.getRecentEmployees);
router.put("/:id", employeeController.updateEmployee);
router.delete("/:id", employeeController.deleteEmployee);

export default router;
