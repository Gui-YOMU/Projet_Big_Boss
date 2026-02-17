import express from "express";
import { companyAuthguard } from "../services/companyAuthguard.js";
import { addEmployee, deleteEmployee, getEmployeeInformation } from "../controllers/employeeController.js";

export const employeeRouter = express.Router();

employeeRouter.post("/add", companyAuthguard, addEmployee);

employeeRouter.get("/:id", companyAuthguard, getEmployeeInformation);

employeeRouter.post("/:id/delete", companyAuthguard, deleteEmployee);