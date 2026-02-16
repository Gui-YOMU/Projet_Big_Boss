import express from "express";
import { getCompanySignin, postCompanySignin } from "../controllers/companyController.js";

export const companyRouter = express.Router();

companyRouter.get("/signin", getCompanySignin);
companyRouter.post("/signin", postCompanySignin);