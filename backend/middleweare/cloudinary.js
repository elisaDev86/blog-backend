import cloudinary from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// Configurazione di Cloudinary utilizzando le variabili d'ambiente
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// controlla che le variabili d'ambiente siano corrette
console.log("Cloudinary Config:", {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
});
export default cloudinary;
