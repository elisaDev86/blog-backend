import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Definizione dello schema utente
const userSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },  // La password verrà criptata prima di essere salvata
    },
    { timestamps: true } // Aggiunge campi "createdAt" e "updatedAt" automaticamente
);

// 🔹 Middleware per criptare la password prima di salvarla nel database
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next(); // Se la password non è stata modificata, passa avanti

    const salt = await bcrypt.genSalt(10); // Genera un "sale" casuale
    this.password = await bcrypt.hash(this.password, salt); // Cripta la password
    next();
});

// 🔹 Metodo per verificare la password inserita nel login
userSchema.methods.comparePassword = async function (passwordInserita) {
    return bcrypt.compare(passwordInserita, this.password); // Confronta la password inserita con quella salvata
};

// Creazione del modello
const User = mongoose.model("User", userSchema);

export default User;


//Campo name: Un campo obbligatorio di tipo stringa per il nome dell'utente.

//Campo email: Un campo obbligatorio di tipo stringa per l'email dell'utente. È anche unico (unique: true), per evitare duplicati nel database.

//Campo password: Un campo obbligatorio di tipo stringa per la password. Viene criptata.

//timestamps: true: Questa opzione aggiunge automaticamente i campi createdAt e updatedAt al modello, che tconsentono di tracciare quando ogni documento è stato creato o aggiornato.

