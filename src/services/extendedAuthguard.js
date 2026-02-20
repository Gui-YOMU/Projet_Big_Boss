import { PrismaClient } from "../../generated/prisma/client.js";
import { adapter } from "../../prisma/adapter.js";

const prisma = new PrismaClient({ adapter });

export async function extendedAuthguard(req, res, next) {
  try {
    if (req.session.employee) {
      const employee = await prisma.employee.findUnique({
        where: {
          id: req.session.employee,
        },
      });
      if (employee) {
        req.employee = employee;
        return next();
      }
    } else if (req.session.company) {
      const company = await prisma.company.findUnique({
        where: {
          id: req.session.company,
        },
      });
      if (company) {
        req.company = company;
        return next();
      }
    } else {
      throw new Error("Aucun enregistrement en session.");
    }
  } catch (error) {
    console.error(error);
    res.redirect("/");
  }
}
