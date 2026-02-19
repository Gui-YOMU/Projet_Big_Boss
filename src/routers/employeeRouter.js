import express from "express";
import { companyAuthguard } from "../services/companyAuthguard.js";
import { addEmployee, deleteEmployee, getEmployeeInformation, giveCar, giveMission, takeCar, updateEmployee } from "../controllers/employeeController.js";

export const employeeRouter = express.Router();

employeeRouter.post("/add", companyAuthguard, addEmployee);

employeeRouter.get("/:id", companyAuthguard, getEmployeeInformation);
employeeRouter.post("/:id", companyAuthguard, getEmployeeInformation);

employeeRouter.post("/:id/delete", companyAuthguard, deleteEmployee);

employeeRouter.post("/:id/update", companyAuthguard, updateEmployee);

employeeRouter.post("/:id/mission", companyAuthguard, giveMission);

employeeRouter.post("/:id/give", companyAuthguard, giveCar);
employeeRouter.post("/:id/take", companyAuthguard, takeCar);