import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";

require("dotenv").config();

const app = express();

// Paramètres de l'application
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser())

//Importation des controllers
import { insertUser, loginUser, logout, verifyToken } from "./controllers/UsersController";
import { addDream } from "./controllers/DreamController";
import { authChecker } from "./middlewares/authChecker";

//** Routes public
app.post("/newUser", insertUser);
app.post("/loginUser", loginUser);
app.post("/logout", logout)
app.post("/verifyToken", verifyToken);
app.post("/addDream", authChecker, addDream)

//** Routes privés

// Lancement de l'application sur le port 8000
app.listen("8000", () => {
  console.log("Serveur lance");
});