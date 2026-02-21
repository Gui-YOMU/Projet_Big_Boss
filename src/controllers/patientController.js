import { PrismaClient } from "../../generated/prisma/client.js";
import { adapter } from "../../prisma/adapter.js";
import { checkRegexExtension } from "../../prisma/extensions/checkRegexExtension.js";
import { escapehtml } from "../services/escapehtml.js";
import { getCoordinates } from "../services/geocoder.js";

const prisma = new PrismaClient({ adapter }).$extends(checkRegexExtension);

export async function addPatient(req, res) {
  const { lastName, firstName, streetNumber, street, zipCode, city, tourId } =
    req.body;
  try {
    await prisma.patient.create({
      data: {
        lastName: escapehtml(lastName),
        firstName: escapehtml(firstName),
        streetNumber: parseInt(escapehtml(streetNumber)),
        street: escapehtml(street),
        zipCode: escapehtml(zipCode),
        city: escapehtml(city),
        tourId: parseInt(tourId),
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
      error: "Erreur lors de l'ajout du patient.",
    });
  }
}

export async function getPatientInformation(req, res) {
  try {
    const patient = await prisma.patient.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });
    let address = patient.city
    const coordinates = await getCoordinates(address)
    let tour;
    if (patient.tourId) {
      tour = await prisma.tour.findUnique({
        where: {
          id: patient.tourId,
        },
      });
    }
    let update;
    if (req.body) {
      update = req.body.update;
    } else {
      update = null;
    }
    res.render("pages/patientInformation.twig", {
      title: "Patient",
      patient,
      company: req.company,
      employee: req.employee,
      update,
      tour,
      coordinates
    });
  } catch (error) {
    console.error(error);
    res.render("pages/patientInformation.twig", {
      title: "Patient",
      error: "Erreur lors de l'affichage des informations du patient.",
    });
  }
}

export async function deletePatient(req, res) {
  try {
    await prisma.patient.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });
    res.redirect("/dashboard");
  } catch (error) {
    console.error(error);
    const patient = await prisma.patient.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });
    res.render("pages/patientInformation.twig", {
      title: "Patient",
      company: req.company,
      patient,
      error: "Erreur lors de la suppression du patient.",
    });
  }
}

export async function updatePatient(req, res) {
  if (req.body.updateNo) {
    res.redirect(`/patients/${parseInt(req.params.id)}`);
  } else {
    const { lastName, firstName, streetNumber, street, zipCode, city, tourId } =
      req.body;
    try {
      await prisma.patient.update({
        data: {
          lastName: escapehtml(lastName),
          firstName: escapehtml(firstName),
          streetNumber: parseInt(escapehtml(streetNumber)),
          street: escapehtml(street),
          zipCode: escapehtml(zipCode),
          city: escapehtml(city),
          tourId: parseInt(tourId)
        },
        where: {
          id: parseInt(req.params.id),
        },
      });
      res.redirect(`/patients/${parseInt(req.params.id)}`);
    } catch (error) {
      console.error(error);
      const patient = await prisma.patient.findUnique({
        where: {
          id: parseInt(req.params.id),
        },
      });
      res.render("pages/patientInformation.twig", {
        title: "Patient",
        company: req.company,
        patient,
        error: "Erreur lors de la modification du patient.",
      });
    }
  }
}
