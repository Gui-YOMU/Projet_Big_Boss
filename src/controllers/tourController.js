import { PrismaClient } from "../../generated/prisma/client.js";
import { adapter } from "../../prisma/adapter.js";
import { escapehtml } from "../services/escapehtml.js";

const prisma = new PrismaClient({ adapter })

export async function createTour(req, res) {
  const { name } = req.body;
  try {
    await prisma.tour.create({
      data: {
        name: escapehtml(name),
      },
    });
    res.redirect("/dashboard");
  } catch (error) {
    console.error(error);
    const employees = await prisma.employee.findMany();
    const cars = await prisma.car.findMany();
    const patients = await prisma.patient.findMany();
    res.render("pages/companyDashboard.twig", {
      title: "Dashboard",
      employees,
      cars,
      patients,
      error: "Erreur lors de la création de la tournée.",
    });
  }
}