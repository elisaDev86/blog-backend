import express from "express";
import { getComments, createComment, deleteComment } from "../controllers/comment.controller.js";

const routerComment = express.Router();

routerComment.get("/", getComments);      // GET lista commenti
routerComment.post("/create", createComment);  // POST creare un commento
routerComment.delete("/:id", deleteComment);  // DELETE eliminare un commento

export default routerComment;
