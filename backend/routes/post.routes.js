import express from 'express';
import { createPost, getAllPosts, getPostById, updatePost, deletePost } from '../controllers/post.controller.js'; // Importa la logica

const routerPost = express.Router();

// Crea un nuovo post
routerPost.post('/create', createPost);

// Recupera tutti i post
routerPost.get('/', getAllPosts);

// Recupera un post specifico per ID
routerPost.get('/:id', getPostById);

// Aggiorna un post
routerPost.patch('/:id', updatePost);

// Elimina un post
routerPost.delete('/:id', deletePost);

export default routerPost;

//POST /create: crea un nuovo post. Ci aspettiamo di ricevere title, content e authorId (ID dell'autore). Se l'autore esiste, salviamo il post.
//GET /: recupera tutti i post dal database, popolando i dati dell'autore (nome, email).
//GET /:id: recupera un singolo post per ID.
//PUT /:id: aggiorna un post esistente. Modifica il titolo e/o il contenuto, e aggiorna la data di modifica.
//DELETE /:id: elimina un post.