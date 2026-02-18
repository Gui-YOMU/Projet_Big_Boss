import { PrismaClient } from "../../generated/prisma/client.js";
import { adapter } from "../../prisma/adapter.js";

const prisma = new PrismaClient({ adapter });

export async function companyAuthguard(req, res, next) {
  try {
    if (req.session.company) {
      const company = await prisma.company.findUnique({
        select: {
                    id: true,
                    name: true,
                    siret: true,
                    ceo: true,
                    employees: {
                        select: {
                            id: true,
                            lastName: true,
                            firstName: true
                        }
                    },
                    cars: {
                        select: {
                            id: true,
                            name: true,
                            plate: true
                        }
                    },
                    patients: {
                        select: {
                            id: true,
                            lastName: true,
                            firstName: true
                        }
                    },
                    tours: {
                        select: {
                            id: true,
                            name: true
                        }
                    },
                    missions: {
                        select: {
                            id: true
                        }
                    }
                },
        where: {
          id: req.session.company,
        },
      });
      if (company) {
        req.company = company;
        return next();
      } else {
        throw new Error("L'établissement n'existe plus en base de données.");
      }
    } else {
      throw new Error("Aucun établissement n'est enregistré en session.");
    }
  } catch (error) {
    console.error(error);
    res.redirect("/login");
  }
}
