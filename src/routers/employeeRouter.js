import express from "express";
import { companyAuthguard } from "../services/companyAuthguard.js";
import { addEmployee, deleteEmployee, getEmployeeDashboard, getEmployeeInformation, getEmployeeLogin, getEmployeeLogout, getResetPassword, giveCar, giveMission, postEmployeeLogin, postResetPassword, takeCar, updateEmployee } from "../controllers/employeeController.js";
import { employeeAuthguard } from "../services/employeeAuthguard.js";

export const employeeRouter = express.Router();

employeeRouter.post("/employees/add", companyAuthguard, addEmployee);

employeeRouter.get("/employees/login", getEmployeeLogin);
employeeRouter.post("/employees/login", postEmployeeLogin);

employeeRouter.get("/employees/reset", getResetPassword);
employeeRouter.post("/employees/reset", postResetPassword);

employeeRouter.get("/employees/logout", getEmployeeLogout);

employeeRouter.get("/employees/dashboard", employeeAuthguard, getEmployeeDashboard);
employeeRouter.post("/employees/dashboard", employeeAuthguard, getEmployeeDashboard);

employeeRouter.get("/employees/:id", companyAuthguard, getEmployeeInformation);
employeeRouter.post("/employees/:id", companyAuthguard, getEmployeeInformation);

employeeRouter.post("/employees/:id/delete", companyAuthguard, deleteEmployee);

employeeRouter.post("/employees/:id/update", companyAuthguard, updateEmployee);

employeeRouter.post("/employees/:id/mission", companyAuthguard, giveMission);

employeeRouter.post("/employees/:id/give", companyAuthguard, giveCar);
employeeRouter.post("/employees/:id/take", companyAuthguard, takeCar);

