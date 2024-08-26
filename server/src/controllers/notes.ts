import { RequestHandler } from "express";
import NoteModel from "../models/note";
import createHttpError from "http-errors";
import mongoose from "mongoose";

export const getNotes: RequestHandler = async (req, res, next) => {
  try {
    const notes = await NoteModel.find();
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

export const getNoteById: RequestHandler = async (req, res, next) => {
  const noteId = req.params.noteId;
  try {
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(404, "Invalid Note ID.");
    }

    const note = await NoteModel.findById(noteId);

    if (!note) {
      throw createHttpError(400, "Note not found.");
    }

    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

interface CreateNoteBody {
  title?: string;
  text?: string;
}

export const createNote: RequestHandler<
  unknown,
  unknown,
  CreateNoteBody,
  unknown
> = async (req, res, next) => {
  try {
    if (!req.body.title) {
      throw createHttpError(400, "Title cannot be empty.");
    }
    const newNote = await NoteModel.create(req.body);
    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};
