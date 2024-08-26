import app from "./app";
import env from "./util/validateEnv";
import mongoose from "mongoose";

const PORT = env.PORT;

mongoose
  .connect(env.MONGODB_CONNECTION_STRING)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
