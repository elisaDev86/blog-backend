import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    try {
        // Recupera il token dall'header Authorization
        const token = req.header("Authorization")?.replace("Bearer ", "").trim();

        if (!token) {
            return res.status(401).json({ message: "Accesso negato. Token mancante." });
        }

        // Verifica il token JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Aggiunge i dati dell'utente alla richiesta
        req.user = decoded;
        next(); // Passa al prossimo middleware o controller
    } catch (error) {
        console.error("Errore nella verifica del token:", error);

        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Sessione scaduta. Effettua nuovamente il login." });
        } else if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Token non valido. Accesso negato." });
        }

        return res.status(500).json({ message: "Errore interno del server." });
    }
};

export default authMiddleware;
