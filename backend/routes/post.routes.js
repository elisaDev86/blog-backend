import express from 'express';
import cors from 'cors';
import passport from 'passport';
import { createPost, getAllPosts, getPostById, updatePost, deletePost } from '../controllers/post.controller.js';

const routerPost = express.Router();

// Configura le opzioni CORS
const corsOptions = {
    origin: ["https://blog-frontend-uz18.vercel.app", "http://localhost:5173"],
    methods: "GET,POST,PUT,DELETE,PATCH",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true,
};

// Crea un nuovo post (CORS applicato solo qui)
routerPost.post('/create', cors(corsOptions), passport.authenticate("jwt", { session: false }), createPost);

// Recupera tutti i post
routerPost.get('/', cors(corsOptions), getAllPosts);

// Recupera un post specifico per ID
routerPost.get('/:id', cors(corsOptions), getPostById);

// Aggiorna un post
routerPost.patch('/:id', cors(corsOptions), passport.authenticate("jwt", { session: false }), updatePost);

// Elimina un post
routerPost.delete('/:id', cors(corsOptions), passport.authenticate("jwt", { session: false }), deletePost);

export default routerPost;


//POST /create: crea un nuovo post. Ci aspettiamo di ricevere title, content e authorId (ID dell'autore). Se l'autore esiste, salviamo il post.
//GET /: recupera tutti i post dal database, popolando i dati dell'autore (nome, email).
//GET /:id: recupera un singolo post per ID.
//PUT /:id: aggiorna un post esistente. Modifica il titolo e/o il contenuto, e aggiorna la data di modifica.
//DELETE /:id: elimina un post.

