import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt"; // ✅ Importa JWT
import dotenv from "dotenv";
import User from "../models/user.js"; // Assicurati di avere il modello User

dotenv.config();

// ✅ Configurazione strategia Google OAuth
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "https://blog-backend-01s3.onrender.com/api/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            console.log("Profilo Google:", profile);
            return done(null, profile);
        }
    )
);

// ✅ Configurazione strategia JWT
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET, // Assicurati che JWT_SECRET sia nel file .env
};

passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
        try {
            const user = await User.findById(jwt_payload.id);
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        } catch (err) {
            return done(err, false);
        }
    })
);

// ✅ Serializzazione e deserializzazione
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

export default passport;
