import express from "express";
import { companyAuthguard } from "../services/companyAuthguard.js";
import { addPatient, deletePatient, getPatientInformation, updatePatient } from "../controllers/patientController.js";

export const patientRouter = express.Router();

patientRouter.post("/add", companyAuthguard, addPatient)

patientRouter.get("/:id", companyAuthguard, getPatientInformation);
patientRouter.post("/:id", companyAuthguard, getPatientInformation);

patientRouter.post("/:id/delete", companyAuthguard, deletePatient);

patientRouter.post("/:id/update", companyAuthguard, updatePatient);