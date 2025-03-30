import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";

dotenv.config();

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,   // Prende l'ID dal .env
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,  // Prende il Secret dal .env
            callbackURL: "/api/auth/google/callback",  // L'endpoint a cui Google risponde
        },
        (accessToken, refreshToken, profile, done) => {
            // Qui salvo l'utente nel database
            console.log("Profilo Google:", profile);
            return done(null, profile);
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
