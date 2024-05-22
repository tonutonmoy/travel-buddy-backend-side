import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { ZodError } from "zod";
import zodErrorHandler from "../error/zodErrorHandler";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import prismaErrorHandler from "../error/prismaErrorHandler";

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ZodError) {
    const response = zodErrorHandler(err);

    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: response.message,
      errorDetails: response.errorDetails,
    });
  }
  if (err instanceof PrismaClientKnownRequestError) {
    const response = prismaErrorHandler(err);

    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: response.message,
      errorDetails: response.errorDetails,
    });
  }

  console.log(err, "hello");
  res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: err.message || "Something went wrong!",
    errorDetails: err,
  });
};

export default globalErrorHandler;
