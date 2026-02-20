import express from "express";
import { companyAuthguard } from "../services/companyAuthguard.js";
import { addEmployee, deleteEmployee, getEmployeeInformation, getEmployeeLogin, giveCar, giveMission, postEmployeeLogin, takeCar, updateEmployee } from "../controllers/employeeController.js";

export const employeeRouter = express.Router();

employeeRouter.post("/add", companyAuthguard, addEmployee);

employeeRouter.get("/employees/:id", companyAuthguard, getEmployeeInformation);
employeeRouter.post("/employees/:id", companyAuthguard, getEmployeeInformation);

employeeRouter.post("/employees/:id/delete", companyAuthguard, deleteEmployee);

employeeRouter.post("/employees/:id/update", companyAuthguard, updateEmployee);

employeeRouter.post("/employees/:id/mission", companyAuthguard, giveMission);

employeeRouter.post("/employees/:id/give", companyAuthguard, giveCar);
employeeRouter.post("/employees/:id/take", companyAuthguard, takeCar);

employeeRouter.get("/employees/login", getEmployeeLogin);
employeeRouter.post("/employees/login", postEmployeeLogin);