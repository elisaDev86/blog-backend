import Comment from "../models/comment.js";

// 🔹 Ottenere tutti i commenti
export const getComments = async (req, res) => {
    try {
        const comments = await Comment.find().populate("authorId", "name email");
        res.status(200).json(comments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Errore nel recupero dei commenti" });
    }
};

// 🔹 Creare un nuovo commento
export const createComment = async (req, res) => {
    const { postId, authorId, content } = req.body;

    try {
        const newComment = new Comment({ postId, authorId, content });
        await newComment.save();
        res.status(201).json({ message: "Commento creato con successo!", comment: newComment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Errore nella creazione del commento" });
    }
};

// 🔹 Eliminare un commento
export const deleteComment = async (req, res) => {
    const { id } = req.params;

    try {
        const comment = await Comment.findById(id);
        if (!comment) {
            return res.status(404).json({ message: "Commento non trovato!" });
        }

        await comment.deleteOne();
        res.status(200).json({ message: "Commento eliminato con successo!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Errore nell'eliminazione del commento" });
    }
};
