import express from "express";
import { companyAuthguard } from "../services/companyAuthguard.js";
import { createTour, getAllTours } from "../controllers/tourController.js";

export const tourRouter = express.Router();

tourRouter.post("/add", companyAuthguard, createTour);

tourRouter.get("/", companyAuthguard, getAllTours)