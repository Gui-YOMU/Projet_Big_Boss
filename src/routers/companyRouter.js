import express from "express";
import { getCompanyDashboard, getCompanyLogin, getCompanyLogout, getCompanySignin, getIndex, postCompanyLogin, postCompanySignin } from "../controllers/companyController.js";
import { companyAuthguard } from "../services/companyAuthguard.js";

export const companyRouter = express.Router();

companyRouter.get("/", getIndex);

companyRouter.get("/signin", getCompanySignin);
companyRouter.post("/signin", postCompanySignin);

companyRouter.get("/login", getCompanyLogin);
companyRouter.post("/login", postCompanyLogin);

companyRouter.get("/dashboard", companyAuthguard, getCompanyDashboard);

companyRouter.get("/logout", getCompanyLogout);