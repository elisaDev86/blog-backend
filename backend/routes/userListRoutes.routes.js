import express from "express";
import User from "../models/user.js"; // Importa il modello User

const router = express.Router();

// Rotta per ottenere tutti gli utenti
router.get("/", async (req, res) => {
    try {
        const users = await User.find({}, "_id firstName lastName email"); // Recupera solo i campi necessari
        res.status(200).json(users);
    } catch (error) {
        console.error("Errore nel recupero utenti:", error);
        res.status(500).json({ message: "Errore del server" });
    }
});

export default router;
