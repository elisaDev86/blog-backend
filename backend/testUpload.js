import uploadImageFromUrl from './utils/uploadImageFromUrl.js'; // Importa la funzione

const imageUrl = "https://unsplash.com/it/foto/cielo-notturno-pieno-di-stelle-e-sagome--JMK4lyhnGM"; // URL di esempio

uploadImageFromUrl(imageUrl)
    .then((result) => {
        console.log("✅ Immagine caricata con successo!");
        console.log("🌍 URL dell'immagine su Cloudinary:", result.secure_url);
    })
    .catch((error) => {
        console.error("❌ Errore:", error.message);
    });
