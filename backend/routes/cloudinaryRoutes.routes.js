import express from 'express';
import multer from 'multer';
import uploadImage from '../middleweare/uploadCloudinary.js';

const router = express.Router();

// Configura Multer per caricare il file in memoria
const storage = multer.diskStorage({  // Memorizza l'immagine su disco
    destination: (req, file, cb) => {
        cb(null, 'public/');  // Directory di destinazione
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);  // Nome del file unico
    }
});
const upload = multer({ storage: storage });  // Usa Multer con la configurazione di storage in memoria

// Endpoint per caricare l'immagine
router.post('/upload', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'Nessun file caricato' });  // Verifica se il file è stato caricato
        }

        // Passa il buffer dell'immagine (req.file.buffer) alla funzione di upload
        const result = await uploadImage(req.file.filename);  // La funzione 'uploadImage' carica l'immagine su Cloudinary

        // Restituisce l'URL dell'immagine caricata
        res.json({ result });
    } catch (error) {
        console.error('Errore durante il caricamento dell\'immagine:', error);
        res.status(500).json({ error: 'Errore durante il caricamento dell\'immagine' });
    }
});

export default router;
