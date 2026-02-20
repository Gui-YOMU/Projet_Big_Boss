import express from "express";
import { companyAuthguard } from "../services/companyAuthguard.js";
import { addCar, deleteCar, getCarInformation, giveCar, updateCar } from "../controllers/carController.js";

export const carRouter = express.Router();

carRouter.post("/cars/add", companyAuthguard, addCar);

carRouter.get("/cars/:id", companyAuthguard, getCarInformation);
carRouter.post("/cars/:id", companyAuthguard, getCarInformation);

carRouter.post("/cars/:id/delete", companyAuthguard, deleteCar);

carRouter.post("/cars/:id/update", companyAuthguard, updateCar);

carRouter.post("/cars/:id/give", companyAuthguard, giveCar);