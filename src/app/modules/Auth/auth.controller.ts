import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { AuthServices } from "./auth.service";
import sendResponse from "../../../shared/sendResponse";

const RegistrationUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.RegistrationDB(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.loginUserDB(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User logged in successfully",
    data: result,
  });
});

export const AuthController = {
  loginUser,
  RegistrationUser,
};
