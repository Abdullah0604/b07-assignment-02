import express, { type Application, type Response } from "express";

const app: Application = express();

app.use(express.json());

app.get("/", (_, res: Response) => {
  res.status(200).json({
    success: true,
    message: "server is working",
  });
});

export default app;
