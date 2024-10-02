import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import NoteRoutes from "./routes/notes";
import userRoutes from "./routes/users";
import session from "express-session";
import MongoStore from "connect-mongo";
import env from "./util/validateEnv";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use(
  session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000,
    },
    rolling: true,
    store: MongoStore.create({
      mongoUrl: env.MONGODB_CONNECTION_STRING,
    }),
  })
);

app.use("/api/notes", NoteRoutes);
app.use("/api/users", userRoutes);

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
