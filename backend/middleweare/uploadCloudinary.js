import cloudinary from "./cloudinary.js";
import path from "path";
import { fileURLToPath } from "url";

// Funzione per caricare un'immagine su Cloudinary
const uploadImage = async (filename) => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const image_path = path.join(__dirname, "../public", filename);

  try {
    // Carica l'immagine su Cloudinary utilizzando il buffer
    const result = await cloudinary.v2.uploader.upload(image_path, {
      folder: "blog_images", // Organizza le immagini in cartelle
      use_filename: true, // Usa il nome del file originale
      unique_filename: false, // Se il nome del file deve essere unico, imposta a true
      resource_type: "auto", // Gestisce automaticamente il tipo di risorsa (immagini, video, ecc.)
    });

    return result; // Restituisce l'URL dell'immagine e altre informazioni
  } catch (error) {
    console.error(error);
    throw new Error(
      "Errore durante il caricamento dell'immagine su Cloudinary"
    );
  }
};

export default uploadImage;
