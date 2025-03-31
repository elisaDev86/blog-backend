import express from "express";
import cors from "cors";  
import mongoose from "mongoose";
import dotenv from "dotenv";
import session from "express-session";
import passport from "./config/passport.js";  

import userRoutes from "./routes/user.routes.js"; 
import postRoutes from './routes/post.routes.js'; 
import userListRoutes from "./routes/userListRoutes.routes.js"; 
import cloudinaryRoutes from './routes/cloudinaryRoutes.routes.js';  
import authRoutes from "./routes/auth.routes.js";  

dotenv.config(); // Carica le variabili d'ambiente

// Inizializza il server
const server = express();

// 📌 Configura CORS PRIMA DI TUTTO
const corsOptions = {
    origin: ["https://blog-frontend-uz18.vercel.app", "http://localhost:3000", "http://localhost:5173"], 
    methods: "GET,POST,PUT,DELETE,PATCH", 
    allowedHeaders: "Content-Type,Authorization",  
    credentials: true,  
};
server.use(cors(corsOptions)); 

// 📌 Debug Middleware per monitorare le richieste
server.use((req, res, next) => {
    console.log(`🌍 [${req.method}] ${req.url} - Origin: ${req.headers.origin}`);
    next();
});

// 📌 Middleware per abilitare JSON nelle richieste
server.use(express.json());

// 📌 Configura le sessioni PRIMA di Passport
server.use(session({
    secret: process.env.SESSION_SECRET || "supersegreto", 
    resave: false,
    saveUninitialized: true,
}));

// 📌 Inizializza Passport
server.use(passport.initialize());
server.use(passport.session());

// 📌 Connessione a MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ Connesso a MongoDB");
    } catch (err) {
        console.error("❌ Errore di connessione a MongoDB:", err.message);
        process.exit(1); 
    }
};
connectDB();

// 📌 Rotte API
server.use("/api/users", userRoutes); 
server.use("/api/posts", postRoutes); 
server.use("/api/userlist", userListRoutes); 
server.use("/api/cloudinary", cloudinaryRoutes);  
server.use("/api/auth", authRoutes);  

// 📌 Gestione errori generica
server.use((err, req, res, next) => {
    console.error("🔥 Errore:", err.message);
    res.status(500).json({ error: "Errore interno del server" });
});

// 📌 Porta e avvio server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.clear();
    console.log(`🚀 Server avviato sulla porta ${PORT}`);
});

