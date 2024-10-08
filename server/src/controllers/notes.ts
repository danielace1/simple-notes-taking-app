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
  const title = req.body.title;
  const text = req.body.text;

  try {
    if (!req.body.title) {
      throw createHttpError(400, "Title cannot be empty.");
    }
    const newNote = await NoteModel.create({
      title: title,
      text: text,
    });

    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};

interface updateNoteParams {
  noteId: string;
}

interface updateNoteBody {
  title?: string;
  text?: string;
}

export const updateNoteById: RequestHandler<
  updateNoteParams,
  unknown,
  updateNoteBody,
  unknown
> = async (req, res, next) => {
  const noteId = req.params.noteId;
  const newTitle = req.body.title;
  const newText = req.body.text;

  try {
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(404, "Invalid Note ID.");
    }
    if (!newTitle) {
      throw createHttpError(400, "Title cannot be empty.");
    }

    const note = await NoteModel.findById(noteId);

    if (!note) {
      throw createHttpError(400, "Note not found.");
    }

    note.title = newTitle;
    note.text = newText;
    const updatedNote = await note.save();

    res.status(200).json(updatedNote);
  } catch (error) {
    next(error);
  }
};

export const deleteNoteById: RequestHandler = async (req, res, next) => {
  const noteId = req.params.noteId;

  try {
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, "Invalid Note ID.");
    }

    const note = await NoteModel.findByIdAndDelete(noteId);

    if (!note) {
      throw createHttpError(404, "Note not found.");
    }

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
