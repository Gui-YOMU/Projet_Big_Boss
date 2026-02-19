import { PrismaClient } from "../../generated/prisma/client.js";
import { adapter } from "../../prisma/adapter.js";
import { checkRegexExtension } from "../../prisma/extensions/checkRegexExtension.js";
import { hashPasswordExtension } from "../../prisma/extensions/hashPasswordExtension.js";
import { escapehtml } from "../services/escapehtml.js";
import { formatDate } from "../services/formatDate.js";

const prisma = new PrismaClient({ adapter })
  .$extends(checkRegexExtension)
  .$extends(hashPasswordExtension);

export async function addEmployee(req, res) {
  const { lastName, firstName, mail, password } = req.body;
  if (req.body.birthday == "") {
    req.body.birthday = null;
  } else {
    req.body.birthday = new Date(req.body.birthday);
  }
  if (req.body.gender == "") {
    req.body.gender = null;
  }
  try {
    await prisma.employee.create({
      data: {
        lastName: escapehtml(lastName),
        firstName: escapehtml(firstName),
        mail: escapehtml(mail),
        password: password,
        birthday: req.body.birthday,
        gender: req.body.gender,
        companyId: req.company.id,
      },
    });
    res.redirect("/dashboard");
  } catch (error) {
    console.error(error);
    const employees = await prisma.employee.findMany({
      where: {
        companyId: req.company.id,
      },
    });
    const cars = await prisma.car.findMany({
      where: {
        companyId: req.company.id,
      },
    });
    const patients = await prisma.patient.findMany({
      where: {
        companyId: req.company.id,
      },
    });
    res.render("pages/companyDashboard.twig", {
      title: "Dashboard",
      employees,
      cars,
      patients,
      error: "Erreur lors de l'ajout de l'employé.",
    });
  }
}

export async function getEmployeeInformation(req, res) {
  try {
    const employee = await prisma.employee.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
      select: {
        id: true,
        lastName: true,
        firstName: true,
        mail: true,
        birthday: true,
        gender: true,
        car: {
          select: {
            id: true,
            name: true,
            plate: true,
          },
        },
      },
    });
    let birthday;
    if (employee.birthday) {
      birthday = formatDate(employee.birthday);
      employee.birthday = employee.birthday.toLocaleDateString();
    }
    let update;
    if (req.body) {
      update = req.body.update;
    } else {
      update = null;
    }
    res.render("pages/employeeInformation.twig", {
      title: "Employé",
      employee,
      birthday,
      company: req.company,
      update,
    });
  } catch (error) {
    console.error(error);
    res.render("pages/employeeInformation.twig", {
      title: "Employé",
      error: "Erreur lors de l'affichage des informations de l'employé.",
    });
  }
}

export async function deleteEmployee(req, res) {
  try {
    await prisma.employee.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });
    res.redirect("/dashboard");
  } catch (error) {
    console.error(error);
    const employee = await prisma.employee.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });
    res.render("pages/employeeInformation.twig", {
      title: "Employé",
      company: req.company,
      employee,
      error: "Erreur lors de la suppression de l'employé.",
    });
  }
}

export async function updateEmployee(req, res) {
  if (req.body.updateNo) {
    res.redirect(`/employees/${parseInt(req.params.id)}`);
  } else {
    const { lastName, firstName, mail } = req.body;
    if (req.body.birthday == "") {
      req.body.birthday = null;
    } else {
      req.body.birthday = new Date(req.body.birthday);
    }
    if (req.body.gender == "") {
      req.body.gender = null;
    }
    try {
      await prisma.employee.update({
        data: {
          lastName: escapehtml(lastName),
          firstName: escapehtml(firstName),
          mail: escapehtml(mail),
          birthday: req.body.birthday,
          gender: req.body.gender,
        },
        where: {
          id: parseInt(req.params.id),
        },
      });
      res.redirect(`/employees/${parseInt(req.params.id)}`);
    } catch (error) {
      console.error(error);
      const employee = await prisma.employee.findUnique({
        where: {
          id: parseInt(req.params.id),
        },
      });
      res.render("pages/employeeInformation.twig", {
        title: "Employé",
        company: req.company,
        employee,
        error: "Erreur lors de la modification de l'employé.",
      });
    }
  }
}

export async function giveMission(req, res) {
  const mission = new PrismaClient({ adapter });
  console.log(req.body);
  const { patients, car } = req.body;
  try {
    await mission.car.update({
      where: {
        id: car,
      },
      data: {
        employeeId: parseInt(req.params.id),
      },
    });
    await mission.patient.update({
      where: {
        id: patients,
      },
      data: {
        employeeId: parseInt(req.params.id),
      },
    });
    res.redirect(`/employees/${parseInt(req.params.id)}`);
  } catch (error) {
    console.error(error);
    const employee = await prisma.employee.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });
    res.render("pages/employeeInformation.twig", {
      title: "Employé",
      company: req.company,
      employee,
      error: "Erreur lors de l'attribution de la mission.",
    });
  }
}

export async function giveCar(req, res) {
  const { carId } = req.body;
  try {
    await prisma.employee.update({
      data: {
        car: {
          connect: {
            id: parseInt(carId),
          },
        },
      },
      where: {
        id: parseInt(req.params.id),
      },
    });
    res.redirect(`/employees/${parseInt(req.params.id)}`);
  } catch (error) {
    console.error(error);
    const employee = await prisma.employee.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });
    res.render("pages/employeeInformation.twig", {
      title: "Véhicule",
      company: req.company,
      employee,
      error: "Erreur lors de l'affectation du véhicule.",
    });
  }
}

export async function takeCar(req, res) {
  try {
    await prisma.employee.update({
      data: {
        car: {
          disconnect: true,
        },
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
