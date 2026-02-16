import { PrismaClient } from "../../generated/prisma/client.js";
import { adapter } from "../../prisma/adapter.js";
import { hashPasswordExtension } from "../../prisma/extensions/hashPasswordExtension.js";

const prisma = new PrismaClient({ adapter }).$extends(hashPasswordExtension);

export async function getCompanySignin(req, res) {
  res.render("pages/companySignin.twig", {
    title: "Inscription",
  });
}

export async function postCompanySignin(req, res) {
  const { name, siret, ceo, password, confirmPassword } = req.body;
  try {
    if (password === confirmPassword) {
      await prisma.company.create({
        data: {
          name: name,
          siret: siret,
          ceo: ceo,
          password: password,
        },
      });
      res.redirect("/login");
    } else {
      throw new Error("Les mots de passe ne correspondent pas.");
    }
  } catch (error) {
    console.error(error);
    res.render("pages/companySignin.twig", {
      title: "Inscription",
      error,
    });
  }
}