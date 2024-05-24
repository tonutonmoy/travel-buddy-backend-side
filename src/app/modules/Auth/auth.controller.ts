import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { AuthServices } from "./auth.service";
import sendResponse from "../../../shared/sendResponse";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import prisma from "../../../shared/prisma";
import config from "../../../config";
import bcrypt from "bcrypt";

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

const ChangePassword = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization as string;

  const { oldPassword, newPassword } = req?.body;

  if (!token) {
    throw new Error("Unauthorized Access");
  }

  const { email, id } = jwtHelpers.verifyToken(
    token,
    config.jwt.jwt_secret as string
  );

  const user = await prisma.user.findUnique({
    where: { email: email },
  });

  if (!user) {
    throw new Error("Unauthorized Access");
  }
  console.log(user);

  const { userStatus, password } = user;

  if (userStatus !== "Activate") {
    throw new Error("Unauthorized Access");
  }
  const match = await bcrypt.compare(oldPassword, password);

  if (!match) {
    throw new Error("wrong password");
  }

  console.log(match);

  const result = await AuthServices.ChangePasswordDB(id, newPassword);

  sendResponse(res, {
    statusCode: 203,
    success: true,
    message: "User Change Password successfully",
    data: result,
  });
});

export const AuthController = {
  loginUser,
  RegistrationUser,
  ChangePassword,
};
