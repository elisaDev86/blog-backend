import express from "express";
import { registerUser, loginUser, deleteUser } from "../controllers/user.controller.js";
import authMiddleware from "../middleweare/authMiddleware.js";  // Importa il middleware

const userRoutes = express.Router();

userRoutes.post("/register", registerUser);  // Rotta per la registrazione
userRoutes.post("/login", loginUser);  // Rotta per il login

// Aggiunge il middleware di autenticazione alla rotta di eliminazione SOLO L'UTENTE LOGGATO PUò ELIMINARE IL SUO ACCOUNT!!!
userRoutes.delete("/:id", authMiddleware, deleteUser);  // Rotta protetta per eliminare un utente

export default userRoutes;


