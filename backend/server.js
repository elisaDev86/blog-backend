import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import session from "express-session";
import passport from "./config/passport.js";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";

import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";
import userListRoutes from "./routes/userListRoutes.routes.js";
import cloudinaryRoutes from "./routes/cloudinaryRoutes.routes.js";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();

const server = express();

// 🔹 CORS configurato correttamente
const corsOptions = {
    origin: "https://blog-frontend-uz18.vercel.app", // SOLO frontend deployato
    methods: "GET,POST,PUT,DELETE,PATCH",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true,
};
server.use(cors(corsOptions));

// 🔹 Middleware per assicurarsi che ogni risposta includa CORS headers
server.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://blog-frontend-uz18.vercel.app");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

server.use(express.json());

// 🔹 Implementazione della strategia JWT
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET, // Legge il segreto dal .env
};

passport.use(
    new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
        try {
            return done(null, jwtPayload); // L'utente è autenticato
        } catch (error) {
            return done(error, false);
        }
    })
);

// 🔹 Configura sessioni
server.use(session({
    secret: process.env.SESSION_SECRET || "supersegreto",
    resave: false,
    saveUninitialized: true,
}));

server.use(passport.initialize());
server.use(passport.session());

// 🔹 Connessione a MongoDB
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

// 🔹 Rotte API
server.use("/api/users", userRoutes);
server.use("/api/posts", postRoutes);
server.use("/api/userlist", userListRoutes);
server.use("/api/cloudinary", cloudinaryRoutes);
server.use("/api/auth", authRoutes);

// 🔹 Gestione errori generica
server.use((err, req, res, next) => {
    console.error("🔥 Errore:", err.message);
    res.status(500).json({ error: "Errore interno del server" });
});

// 🔹 Porta e avvio server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.clear();
    console.log(`🚀 Server avviato sulla porta ${PORT}`);
});
