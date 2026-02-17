import { PrismaClient } from "../../generated/prisma/client.js";
import { adapter } from "../../prisma/adapter.js";
import { checkRegexExtension } from "../../prisma/extensions/checkRegexExtension.js";
import { escapehtml } from "../services/escapehtml.js";

const prisma = new PrismaClient({ adapter }).$extends(checkRegexExtension);

export async function addCar(req, res) {
  const { name, plate } = req.body;
  try {
    await prisma.car.create({
      data: {
        name: escapehtml(name),
        plate: escapehtml(plate),
        companyId: req.company.id,
      },
    });
    res.redirect("/dashboard");
  } catch (error) {
    console.error(error);
    const employees = await prisma.employee.findMany();
    const cars = await prisma.car.findMany();
    res.render("pages/companyDashboard.twig", {
      title: "Dashboard",
      employees,
      cars,
      error: "Erreur lors de l'ajout du véhicule.",
    });
  }
}

export async function getCarInformation(req, res) {
  try {
    const car = await prisma.car.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });
    let update;
    if (req.body) {
      update = req.body.update;
    } else {
      update = null;
    }
    res.render("pages/carInformation.twig", {
      title: "Véhicule",
      car,
      company: req.company,
      update,
    });
  } catch (error) {
    console.error(error);
    res.render("pages/carInformation.twig", {
      title: "Véhicule",
      error: "Erreur lors de l'affichage des informations du véhicule.",
    });
  }
}

export async function deleteCar(req, res) {
  try {
    await prisma.car.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });
    res.redirect("/dashboard");
  } catch (error) {
    console.error(error);
    const car = await prisma.car.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });
    res.render("pages/carInformation.twig", {
      title: "Véhicule",
      company: req.company,
      car,
      error: "Erreur lors de la suppression du véhicule.",
    });
  }
}

export async function updateCar(req, res) {
  if (req.body.updateNo) {
    res.redirect(`/cars/${parseInt(req.params.id)}`);
  } else {
    const { name, plate } = req.body;
    try {
      await prisma.car.update({
        data: {
          name: escapehtml(name),
          plate: escapehtml(plate),
        },
        where: {
          id: parseInt(req.params.id),
        },
      });
      res.redirect(`/cars/${parseInt(req.params.id)}`);
    } catch (error) {
      console.error(error);
      const car = await prisma.car.findUnique({
        where: {
          id: parseInt(req.params.id),
        },
      });
      res.render("pages/carInformation.twig", {
        title: "Véhicule",
        company: req.company,
        car,
        error: "Erreur lors de la modification du véhicule.",
      });
    }
  }
}
