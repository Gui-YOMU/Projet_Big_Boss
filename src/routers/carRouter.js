import express from "express";
import { companyAuthguard } from "../services/companyAuthguard.js";
import { addCar } from "../controllers/carController.js";

export const carRouter = express.Router();

carRouter.post("/add", companyAuthguard, addCar);