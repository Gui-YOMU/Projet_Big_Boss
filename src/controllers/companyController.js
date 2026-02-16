import { PrismaClient } from "../../generated/prisma/client.js";
import { adapter } from "../../prisma/adapter.js";
import { hashPasswordExtension } from "../../prisma/extensions/hashPasswordExtension.js";
import bcrypt from "bcrypt";

const prisma = new PrismaClient({ adapter }).$extends(hashPasswordExtension);

export async function getCompanySignin(req, res) {
  res.render("pages/companySignin.twig", {
    title: "Inscription"
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
      error
    });
  }
}

export async function getCompanyLogin(req, res) {
  res.render("pages/companyLogin.twig", {
    title: "Connexion"
  });
}

export async function postCompanyLogin(req, res) {
  const { siret, password } = req.body;
  try {
    const company = await prisma.company.findUnique({
      where: {
        siret: siret,
      },
    });
    if (company) {
      if (bcrypt.compare(password, company.password)) {
        req.session.company = company.id;
        res.redirect("/dashboard");
      } else {
        throw new Error("Mot de passe incorrect.");
      }
    } else {
      throw new Error("Cet établissement n'existe pas en base de données.");
    }
  } catch (error) {
    console.error(error);
    res.render("pages/companySignin.twig", {
      title: "Connexion",
      error
    });
  }
}

export async function getCompanyDashboard(req, res) {
  res.render("pages/companyDashboard.twig", {
    title: "Dashboard"
  });
}