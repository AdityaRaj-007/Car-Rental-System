import express from "express";
import authRouter from "./modules/auth/auth.routes";
import bookingRouter from "./modules/bookings/booking.routes";
import { errorMiddleware } from "./shared/middlewares/errorMiddleware";
import { isAuthorized } from "./shared/middlewares/authMiddleware";

const app = express();

app.use(express.json());
app.use("/auth", authRouter);
app.use("/bookings", isAuthorized, bookingRouter);

app.use(errorMiddleware);

export default app;
