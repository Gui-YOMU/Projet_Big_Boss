import { PrismaClient } from "../../generated/prisma/client.js";
import { adapter } from "../../prisma/adapter.js";
import { escapehtml } from "../services/escapehtml.js";

const prisma = new PrismaClient({ adapter })