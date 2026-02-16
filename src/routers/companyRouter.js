import express from "express";
import { getCompanyLogin, getCompanySignin, postCompanyLogin, postCompanySignin } from "../controllers/companyController.js";

export const companyRouter = express.Router();

companyRouter.get("/signin", getCompanySignin);
companyRouter.post("/signin", postCompanySignin);

companyRouter.get("/login", getCompanyLogin);
companyRouter.post("/login", postCompanyLogin);