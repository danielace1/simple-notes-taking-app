import express from "express";
import {
  createNote,
  deleteNoteById,
  getNoteById,
  getNotes,
  updateNoteById,
} from "../controllers/notes";

const router = express.Router();

router.get("/", getNotes);

router.get("/:noteId", getNoteById);

router.post("/", createNote);

router.patch("/:noteId", updateNoteById);

router.delete("/:noteId", deleteNoteById);

export default router;
