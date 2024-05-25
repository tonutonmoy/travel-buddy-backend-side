import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";

import cookieParser from "cookie-parser";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import router from "./app/routes";

const app: Application = express();
app.use(
  cors({
    origin: "https://travel-buddy-matching-frontend.vercel.app",
    credentials: true,
  })
);
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     credentials: true,
//   })
// );

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send({
    Message: "Travel Buddy Matching ...",
  });
});

app.use("/", router);

app.use(globalErrorHandler);

export default app;
