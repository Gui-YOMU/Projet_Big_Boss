import express from "express";
import { companyAuthguard } from "../services/companyAuthguard.js";
import { giveMission} from "../controllers/missionController.js";

export const missionRouter = express.Router();

missionRouter.post("/missions/add", companyAuthguard, giveMission);