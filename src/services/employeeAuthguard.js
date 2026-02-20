import { PrismaClient } from "../../generated/prisma/client.js";
import { adapter } from "../../prisma/adapter.js";

const prisma = new PrismaClient({ adapter });

export async function employeeAuthguard(req, res, next) {
  try {
    if (req.session.employee) {
      const employee = await prisma.employee.findUnique({
        select: {
                    id: true,
                    lastName: true,
                    firstName: true,
                    mail: true,
                    car: {
                        select: {
                            id: true,
                            name: true,
                            plate: true
                        }
                    },
                    missions: {
                        select: {
                            id: true,
                            tourId: true
                            }
                        }
                    }
                ,
        where: {
          id: req.session.employee,
        },
    });
      if (employee) {
        req.employee = employee;
        return next();
      } else {
        throw new Error("L'employé n'existe plus en base de données.");
      }
    } else {
      throw new Error("Aucun employé n'est enregistré en session.");
    }
  } catch (error) {
    console.error(error);
    res.redirect("/employees/login");
  }
}
