import express from "express";
import cors from "cors";
import { clerkMiddleware, requireAuth } from "@clerk/express";
import aiRouter from "./routes/aiRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());


app.use("/api/ai", aiRouter);
app.use("/api/user", userRouter);

export default app;
