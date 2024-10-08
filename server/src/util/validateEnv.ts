import { cleanEnv, str, port } from "envalid";
// import { str, port } from "envalid/dist/validators";

export default cleanEnv(process.env, {
  MONGODB_CONNECTION_STRING: str(),
  PORT: port(),
  SESSION_SECRET: str(),
});
