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

export async function getCarInformation(req, res) {
    try {
        const car = await prisma.car.findUnique({
            where: {
                id: parseInt(req.params.id)
            }
        })
        res.render("pages/carInformation.twig", {
            title: "Véhicule",
            car,
            company: req.company
        })
    } catch (error) {
        console.error(error);
        res.render("pages/companyDashboard.twig", {
            title: "Dashboard",
            error: "Erreur lors de l'affichage des informations du véhicule."
        })
    }
}

export async function deleteCar(req, res) {
    try {
        await prisma.car.delete({
            where: {
                id: parseInt(req.params.id)
            }
        })
        res.redirect("/dashboard");
    } catch (error) {
        console.error(error);
        const car = await prisma.car.findUnique({
            where: {
                id: parseInt(req.params.id)
            }
        })
        res.render("pages/carInformation.twig", {
            title: "Véhicule",
            company: req.company,
            car,
            error: "Erreur lors de la suppression du véhicule."
        })
    }
}