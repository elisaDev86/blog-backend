import cors from "cors";  // Cors si importa UNA SOLA volta
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import session from "express-session";  // 📌 Importiamo express-session per gestire le sessioni
import passport from "./config/passport.js";  // 📌 Importiamo la configurazione di Passport

import userRoutes from "./routes/user.routes.js"; // Importiamo le rotte utenti
import postRoutes from './routes/post.routes.js'; // Importa le rotte per i post
import userListRoutes from "./routes/userListRoutes.routes.js"; // Importa le rotte per la lista degli utenti
import cloudinaryRoutes from './routes/cloudinaryRoutes.routes.js';  // Importa le rotte per Cloudinary
import authRoutes from "./routes/auth.routes.js";  // 📌 Importiamo le rotte di autenticazione Google OAuth

dotenv.config(); // Carica le variabili d'ambiente

// Inizializza il server
const server = express();

// Middleware
server.use(express.json()); // Per gestire JSON nelle richieste

// 📌 Configura le sessioni per Passport
server.use(session({
    secret: "supersegreto",  // Cambia questa stringa con qualcosa di più sicuro
    resave: false,
    saveUninitialized: true,
}));

// 📌 Inizializza Passport per la gestione dell'autenticazione
server.use(passport.initialize());
server.use(passport.session());

// Configura CORS prima di tutte le altre rotte
const corsOptions = {
    origin: ["http://localhost:3000", "http://localhost:5173"], // Solo il frontend da questa origine potrà accedere
    methods: "GET,POST,PUT,DELETE", // Metodi HTTP consentiti
    allowedHeaders: "Content-Type,Authorization",  // Headers consentiti
    credentials: true,  // Permette le credenziali come i cookie
};
server.use(cors(corsOptions)); // Permette richieste da altri domini

// Connessione a MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ Connesso a MongoDB");
    } catch (err) {
        console.error("❌ Errore di connessione a MongoDB:", err);
        process.exit(1); // Arresta il server se la connessione fallisce
    }
};
connectDB();

// 📌 Rotte API
server.use("/api/users", userRoutes); // Rotte per gli utenti
server.use('/api/posts', postRoutes); // Rotte per i post
server.use("/api/userlist", userListRoutes); // Rotte per recuperare la lista degli utenti
server.use("/api/cloudinary", cloudinaryRoutes);  // Aggiungi la rotta per Cloudinary
server.use("/api/auth", authRoutes);  // 📌 Aggiungole rotte per Google OAuth

// Porta e avvio server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.clear();
    console.log(`🚀 Server avviato sulla porta ${PORT}`);
});
