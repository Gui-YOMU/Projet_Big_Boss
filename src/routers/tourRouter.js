import express from "express";
import { companyAuthguard } from "../services/companyAuthguard.js";
import { createTour } from "../controllers/tourController.js";

export const tourRouter = express.Router();

tourRouter.post("/add", companyAuthguard, createTour);