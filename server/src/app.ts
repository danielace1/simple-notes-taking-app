import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import NoteRoutes from "./routes/notes";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use("/api/notes", NoteRoutes);

app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint not found!"));
});

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let errMsg = "An unknown error occurred";
  let statusCode = 500;
  if (isHttpError(error)) {
    statusCode = error.status;
    errMsg = error.message;
  }
  res.status(statusCode).json({ error: errMsg });
});

export default app;
