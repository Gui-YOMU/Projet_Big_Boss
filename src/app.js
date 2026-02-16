import "dotenv/config";
import express from "express";
import session from "express-session";

const port = process.env.PORT;

const app = express();
app.use(express.static("./public"));
app.use(express.urlencoded({extended: true}));
app.use(session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true
}));

app.listen(port, (error) => {
    error ? console.error(error) : console.log(`Connecté au serveur sur le port ${port}.`);
})