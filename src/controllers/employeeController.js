import { PrismaClient } from "../../generated/prisma/client.js";
import { adapter } from "../../prisma/adapter.js";
import { hashPasswordExtension } from "../../prisma/extensions/hashPasswordExtension.js";

const prisma = new PrismaClient({ adapter }).$extends(hashPasswordExtension);

export async function addEmployee(req, res) {
    const { lastName, firstName, mail, password, birthday, gender } = req.body;
    try {
        await prisma.employee.create({
            data: {
                lastName: lastName,
                firstName: firstName,
                mail: mail,
                password: password,
                birthday: new Date(birthday),
                gender: gender,
                companyId: req.company.id
            }
        })
        res.redirect("/dashboard");
    } catch (error) {
        console.error(error);
        res.render("pages/companyDashboard.twig", {
            title: "Dashboard",
            error: "Erreur lors de l'ajout de l'employé."
        })
    }
}
