import express from "express";
import authRouter from "./modules/auth/auth.routes";
import { errorMiddleware } from "./shared/middlewares/errorMiddleware";

const app = express();

app.use(express.json());
app.use("/auth", authRouter);

app.use(errorMiddleware);

export default app;
