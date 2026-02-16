import express from "express";
import { companyAuthguard } from "../services/companyAuthguard.js";
import { addEmployee } from "../controllers/employeeController.js";

export const employeeRouter = express.Router();

employeeRouter.post("/add", companyAuthguard, addEmployee);