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
    const employees = await prisma.employee.findMany({
      where: {
        companyId: req.company.id
      }
    });
    const cars = await prisma.car.findMany({
      where: {
        companyId: req.company.id
      }
    });
    const patients = await prisma.patient.findMany({
      where: {
        companyId: req.company.id
      }
    });
    res.render("pages/companyDashboard.twig", {
      title: "Dashboard",
      employees,
      cars,
      patients,
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
    let employee;
    if (car.employeeId) {
      employee = await prisma.employee.findUnique({
        where: {
          id: parseInt(car.employeeId)
        },
        select: {
          id: true,
          lastName: true,
          firstName: true
        }
      })
    }
    let update;
    if (req.body) {
      update = req.body.update;
    } else {
      update = null;
    }
    console.log(req.company);
    
    res.render("pages/carInformation.twig", {
      title: "Véhicule",
      employee,
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

export async function giveCar(req, res) {
  const { employeeId } = req.body;
  try {
    await prisma.employee.update({
      data: {
        car: {
          connect: {
            id: parseInt(req.params.id),
          },
        },
      },
      where: {
        id: parseInt(employeeId),
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
    res.render("pages/employeeInformation.twig", {
      title: "Véhicule",
      company: req.company,
      car,
      error: "Erreur lors de l'affectation du véhicule.",
    });
  }
}

export async function takeCar(req, res) {
  try {
    await prisma.car.update({
      data: {
        employeeId: null
      },
      where: {
        id: parseInt(req.params.id),
      },
    });
    if (req.body.employee) {
      res.redirect(`/employees/${parseInt(req.body.employee)}`);
    } else if (req.body.car) {
      res.redirect(`/cars/${parseInt(req.body.car)}`);
    }
  } catch (error) {
    console.error(error);
    if (req.body.employee) {
      const employee = await prisma.employee.findUnique({
        where: {
          id: parseInt(req.body.employee),
        },
      });
      res.render("pages/employeeInformation.twig", {
        title: "Employé",
        company: req.company,
        employee,
        error: "Erreur lors de la désaffectation du véhicule.",
      });
    } else if (req.body.car) {
      const car = await prisma.car.findUnique({
        where: {
          id: parseInt(req.body.car),
        },
      });
      res.render("pages/carInformation.twig", {
        title: "Véhicule",
        company: req.company,
        car,
        error: "Erreur lors de la désaffectation du véhicule.",
      });
    }
  }
}