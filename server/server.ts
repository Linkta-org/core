import express from "express";
import type { Express, Request, Response } from "express";
import { getEnv } from "./utils/base";
import genAi from "./routes/genAi";

getEnv();

const app: Express = express();
const PORT = process.env.PORT;

/**
 * Test route for the server. This should direct to the frontend.
 */
app.get("/", (_: Request, res: Response) => {
  res.send({ message: "Hello from the Backend!" });
});

/**
 * Routes.
 */
app.use("/genAi", genAi);

/**
 * Default route for unknown routes. This should be the last route.
 * There should be handling for this in the frontend.
 */
app.use((_: Request, res: Response) => {
  res.status(404).send({ message: "Route not found" });
});

/**
 * Default error handling middleware.
 */
app.use((err: Error, _: Request, res: Response) => {
  const defaultError = {
    log: "Express error handler caught unknown middleware error",
    status: 500,
    message: { err: "An error occurred" },
  };

  const errObj = Object.assign(defaultError, err);
  console.error(errObj.log);

  return res.status(errObj.status).json(errObj.message);
});

/**
 * Start the server.
 */
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
