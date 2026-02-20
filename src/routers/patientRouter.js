import express from "express";
import { companyAuthguard } from "../services/companyAuthguard.js";
import { addPatient, deletePatient, getPatientInformation, updatePatient } from "../controllers/patientController.js";

export const patientRouter = express.Router();

patientRouter.post("/patients/add", companyAuthguard, addPatient)

patientRouter.get("/patients/:id", companyAuthguard, getPatientInformation);
patientRouter.post("/patients/:id", companyAuthguard, getPatientInformation);

patientRouter.post("/patients/:id/delete", companyAuthguard, deletePatient);

patientRouter.post("/patients/:id/update", companyAuthguard, updatePatient);