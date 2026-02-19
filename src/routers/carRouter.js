import express from "express";
import { companyAuthguard } from "../services/companyAuthguard.js";
import { addCar, deleteCar, getCarInformation, updateCar } from "../controllers/carController.js";

export const carRouter = express.Router();

carRouter.post("/add", companyAuthguard, addCar);

carRouter.get("/:id", companyAuthguard, getCarInformation);
carRouter.post("/:id", companyAuthguard, getCarInformation);

carRouter.post("/:id/delete", companyAuthguard, deleteCar);

carRouter.post("/:id/update", companyAuthguard, updateCar);

