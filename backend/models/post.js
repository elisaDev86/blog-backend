import mongoose from 'mongoose';

// Definiamo lo schema per il post
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Riferimento al modello User per collegare il post a un utente
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
},
    { timestamps: true } // Aggiunge campi "createdAt" e "updatedAt" automaticamente
);

// Creiamo il modello per i post
const Post = mongoose.model('Post', postSchema);

export default Post;

//title: il titolo del post, di tipo String e obbligatorio.
//content: il contenuto del post, anch'esso obbligatorio.
//author: è un riferimento all'ID di un utente nel nostro database, quindi ref: 'User'. Questo permette di //collegare ogni post a un autore.
//createdAt: data di creazione, che si imposta automaticamente al momento della creazione del post.
//updatedAt: data dell'ultima modifica, che si aggiornerà ogni volta che il post verrà modificato.