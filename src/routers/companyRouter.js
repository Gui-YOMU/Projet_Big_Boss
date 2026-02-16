import express from "express";
import { getCompanyDashboard, getCompanyLogin, getCompanySignin, postCompanyLogin, postCompanySignin } from "../controllers/companyController.js";
import { companyAuthguard } from "../services/companyAuthguard.js";

export const companyRouter = express.Router();

companyRouter.get("/signin", getCompanySignin);
companyRouter.post("/signin", postCompanySignin);

companyRouter.get("/login", getCompanyLogin);
companyRouter.post("/login", postCompanyLogin);

companyRouter.get("/dashboard", companyAuthguard, getCompanyDashboard);