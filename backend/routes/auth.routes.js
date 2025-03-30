import express from "express";
import passport from "../config/passport.js";

const router = express.Router();

// Avvia il login con Google
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Callback dopo il login
router.get("/google/callback",
    passport.authenticate("google", { session: false }),
    (req, res) => {
        res.redirect(process.env.FRONTEND_HOST);  // Reindirizza alla homepage dopo il login
    }
);

// Logout
router.get("/logout", (req, res) => {
    req.logout(() => {
        res.redirect("/");
    });
});

export default router;
