import express from "express";
import { createNote, getNoteById, getNotes } from "../controllers/notes";

const router = express.Router();

router.get("/", getNotes);

router.get("/:noteId", getNoteById);

router.post("/", createNote);

export default router;
