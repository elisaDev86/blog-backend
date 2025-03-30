import Post from "../models/post.js";
import User from "../models/user.js";

// Crea un nuovo post
export const createPost = async (req, res) => {
  const { title, content, imageUrl } = req.body;
  const userId = req.user.id; // Otteniamo l'ID dell'utente dal middleware

  try {
    // Verifica se l'autore esiste
    const author = await User.findById(userId);
    if (!author) {
      return res.status(400).json({ message: "Autore non trovato!" });
    }

    // Crea il nuovo post
    const newPost = new Post({
      title,
      content,
      author: author._id,
      imageUrl,
    });

    // Salva il post nel database
    await newPost.save();

    return res.status(201).json({ message: "Post creato con successo!", post: newPost });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Errore del server!" });
  }
};

// Recupera tutti i post
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "name email"); // Popola l'autore
    return res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Errore del server!" });
  }
};

// Recupera un post specifico per ID
export const getPostById = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id).populate("author", "name email");
    if (!post) {
      return res.status(404).json({ message: "Post non trovato!" });
    }

    return res.status(200).json(post);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Errore del server!" });
  }
};

// Aggiorna un post
export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content, imageUrl } = req.body;
  const userId = req.user.id; // Otteniamo l'ID dell'utente dal middleware

  try {
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post non trovato!" });
    }

    // Verifica che l'utente che sta cercando di aggiornare il post sia l'autore
    if (post.author.toString() !== userId) {
      return res.status(403).json({ message: "Non hai i permessi per modificare questo post." });
    }

    post.title = title || post.title;
    post.content = content || post.content;
    post.imageUrl = imageUrl || post.imageUrl;
    post.updatedAt = Date.now(); // Impostiamo la data di aggiornamento

    await post.save();

    return res.status(200).json({ message: "Post aggiornato con successo!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Errore del server!" });
  }
};

// Elimina un post
export const deletePost = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id; // Otteniamo l'ID dell'utente dal middleware

  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post non trovato!" });
    }

    // Verifica che l'utente che sta cercando di eliminare il post sia l'autore
    if (post.author.toString() !== userId) {
      return res.status(403).json({ message: "Non hai i permessi per eliminare questo post." });
    }

    await post.deleteOne();

    return res.status(200).json({ message: "Post eliminato con successo!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Errore del server!" });
  }
};
