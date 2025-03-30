import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
    {
        postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
        authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        content: { type: String, required: true },
    },
    { timestamps: true } // Aggiunge "createdAt" e "updatedAt"
);

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
