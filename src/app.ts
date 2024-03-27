import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";

import cookieParser from "cookie-parser";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";

const app: Application = express();
app.use(cors());
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send({
    Message: "Travel Buddy Matching ...",
  });
});

app.use("/api", router);

app.use(globalErrorHandler);

export default app;
