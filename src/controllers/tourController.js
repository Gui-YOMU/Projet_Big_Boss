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
        companyId: req.company.id
      },
    });
    res.redirect("/tours");
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

export async function getAllTours(req, res) {
  try {
    const tours = await prisma.tour.findMany({
      where: {
        companyId: req.company.id
      },
      select: {
        name: true,
        patients: {
          select: {
            id: true,
            lastName: true,
            firstName: true
          }
        }
      }
    })
    res.render("pages/allTours.twig", {
      tours,
      company: req.company
    });
  } catch (error) {
    console.error(error);
    res.render("pages/allTours.twig", {
      company: req.company,
      error: "Erreur lors de l'affichage des tournées."
    });
  }
}