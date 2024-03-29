import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";

import sendResponse from "../../../shared/sendResponse";

import { jwtHelpers } from "../../../helpers/jwtHelpers";
import config from "../../../config";
import { UserProfileServices } from "./user.service";
import prisma from "../../../shared/prisma";

const GetUserProfile = catchAsync(async (req: Request, res: Response) => {
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
  const result = await UserProfileServices.GetUserProfileDB(email);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User profile retrieved successfully",
    data: result,
  });
});

const UpdateUserProfile = catchAsync(async (req: Request, res: Response) => {
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

  const result = await UserProfileServices.UpdateUserProfileDB(email, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User profile updated successfully",
    data: result,
  });
});

export const UserProfileController = {
  GetUserProfile,
  UpdateUserProfile,
};
