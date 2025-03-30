import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";

dotenv.config();

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,  // Prende l'ID client dal file .env
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,  // Prende il secret dal file .env
            callbackURL: "https://blog-backend-01s3.onrender.com/api/auth/google/callback",  // URL completo di callback
        },
        (accessToken, refreshToken, profile, done) => {
            // Qui puoi gestire l'autenticazione dell'utente
            console.log("Profilo Google:", profile);
            return done(null, profile);  // Salva il profilo dell'utente (puoi anche salvarlo nel DB)
        }
    )
);

// Serializzazione (salva l'utente nella sessione)
passport.serializeUser((user, done) => {
    done(null, user);
});

// Deserializzazione (recupera l'utente dalla sessione)
passport.deserializeUser((user, done) => {
    done(null, user);
});

export default passport;
