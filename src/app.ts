import express, { type Application, type Response } from "express";
import authRoutes from "./modules/auth/auth.route.js";

const app: Application = express();

app.use(express.json());
app.use("/api/auth", authRoutes);

app.get("/", (_, res: Response) => {
  res.status(200).json({
    success: true,
    message: "server is working",
  });
});

export default app;
