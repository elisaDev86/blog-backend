import User from "../models/user.js";  // Importa il modello dell'utente
import bcrypt from "bcryptjs";  // Per criptare e confrontare la password
import generateToken from "../utils/generateToken.js";  // Per generare il token JWT

// 🔹 Funzione per registrare un nuovo utente
export const registerUser = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        // Verificare se l'utente esiste già nel database
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "Utente già registrato!" });
        }

        // Criptare la password prima di salvarla
        //const salt = await bcrypt.genSalt(10);  // Generare un "sale" per rendere la criptazione più sicura
        //const hashedPassword = await bcrypt.hash(password, salt);  // Criptare la password

        // Creare un nuovo utente con i dati forniti
        const newUser = new User({
            firstName,
            lastName,
            email,
            password, //hashedPassword,  // Salva la password criptata
        });

        // Salvare il nuovo utente nel database
        await newUser.save();

        // Rispondere con i dettagli dell'utente e un token JWT
        return res.status(201).json({
            message: "Registrazione completata con successo!",
            _id: newUser._id,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email.toLowerCase(),
            token: generateToken(newUser._id),  // Genera un token JWT
        });
    } catch (error) {
        console.error("Errore durante la registrazione:", error);
        return res.status(500).json({ message: "Errore del server!" });
    }
};

// 🔹 Funzione per effettuare il login
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Controllare se l'utente esiste nel database
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Email o password non valide!" });
        }

        // Confrontare la password inserita con quella salvata nel database
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Email o password non valide!" });
        }

        // Se le credenziali sono corrette, restituire i dati dell'utente con un token JWT
        return res.status(200).json({
            message: "Login effettuato con successo!",
            _id: user._id,
            firstName: user.firstName,
            email: user.email.toLowerCase(),
            token: generateToken(user._id),  // Genera un token JWT
        });
    } catch (error) {
        console.error("Errore durante il login:", error);
        return res.status(500).json({ message: "Errore del server!" });
    }
};

// 🔹 Funzione per eliminare un utente
export const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        // Controllare se l'utente esiste nel database
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "Utente non trovato!" });
        }

        // Eliminare l'utente dal database
        await user.deleteOne();

        return res.status(200).json({ message: "Utente eliminato con successo!" });
    } catch (error) {
        console.error("Errore durante l'eliminazione dell'utente:", error);
        return res.status(500).json({ message: "Errore del server!" });
    }
};
