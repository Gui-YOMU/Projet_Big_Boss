import { PrismaClient } from "../../generated/prisma/client.js";
import { adapter } from "../../prisma/adapter.js";

const prisma = new PrismaClient({ adapter });

export async function giveMission(req, res) {
  const { date, tourId, employeeId } = req.body;
  console.log(date);
  
  try {
    await prisma.mission.create({
      data: {
        date: date,
        tourId: parseInt(tourId),
        employeeId: parseInt(employeeId),
        companyId: req.company.id,
      },
    });
    res.redirect(`/employees/${employeeId}`);
  } catch (error) {
    console.error(error);
    const employee = await prisma.employee.findUnique({
      where: {
        id: parseInt(employeeId),
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