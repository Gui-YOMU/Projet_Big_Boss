import { PrismaClient } from "../../generated/prisma/client.js";
import { adapter } from "../../prisma/adapter.js";

const prisma = new PrismaClient({ adapter });

export async function addCar(req, res) {
    const { name, plate } = req.body;
    try {
        await prisma.car.create({
            data: {
                name: name,
                plate: plate,
                companyId: req.company.id
            }
        })
        res.redirect("/dashboard");
    } catch (error) {
        console.error(error);
        res.render("pages/companyDashboard.twig", {
            title: "Dashboard",
            error: "Erreur lors de l'ajout du véhicule."
        })
    }
}