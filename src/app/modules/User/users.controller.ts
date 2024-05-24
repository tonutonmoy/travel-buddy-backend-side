import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";

import sendResponse from "../../../shared/sendResponse";

import { jwtHelpers } from "../../../helpers/jwtHelpers";
import config from "../../../config";

import prisma from "../../../shared/prisma";
import { UsersServices } from "./users.service";

const GeAllUsers = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization as string;

  if (!token) {
    throw new Error("Unauthorized Access");
  }

  const { email } = jwtHelpers.verifyToken(
    token,
    config.jwt.jwt_secret as string
  );

  const user = await prisma.user.findUnique({
    where: { email: email },
  });

  if (!user) {
    throw new Error("Unauthorized Access");
  }

  const result = await UsersServices.GetAllUsersDB();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Users retrieved successfully",
    data: result,
  });
});

const UpdateUserStatus = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization as string;

  console.log("aisi");

  if (!token) {
    throw new Error("Unauthorized Access");
  }

  const { email } = jwtHelpers.verifyToken(
    token,
    config.jwt.jwt_secret as string
  );
  const user = await prisma.user.findUnique({
    where: { email: email },
  });

  if (!user) {
    throw new Error("Unauthorized Access");
  }

  const result = await UsersServices.UpdateUserStatusDB(
    req?.params?.id,
    req?.body
  );

  sendResponse(res, {
    statusCode: 203,
    success: true,
    message: "User Status updated successfully",
    data: result,
  });
});

export const UsersController = {
  UpdateUserStatus,
  GeAllUsers,
};
