import "dotenv/config";
import express from "express";
import session from "express-session";
import path from "path";
import { companyRouter } from "./routers/companyRouter.js";
import { employeeRouter } from "./routers/employeeRouter.js";
import { carRouter } from "./routers/carRouter.js";
import { patientRouter } from "./routers/patientRouter.js";
import { missionRouter } from "./routers/missionRouter.js";
import { tourRouter } from "./routers/tourRouter.js";

const port = process.env.PORT;

const app = express();
app.use('/static', express.static(path.resolve('public')));
app.use(express.urlencoded({extended: true}));
app.use(session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true
}));

app.use(companyRouter);
app.use(employeeRouter);
app.use(carRouter);
app.use(patientRouter);
app.use(tourRouter);
app.use(missionRouter);

app.listen(port, (error) => {
    error ? console.error(error) : console.log(`Connecté au serveur sur le port ${port}.`);
})