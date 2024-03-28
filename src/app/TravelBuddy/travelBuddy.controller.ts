import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { jwtHelpers } from "../../helpers/jwtHelpers";
import config from "../../config";
import { TravelBuddyServices } from "./travelBuddy.service";
import sendResponse from "../../shared/sendResponse";
import prisma from "../../shared/prisma";

const GetTravelBuddies = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization as string;

  const tripId = req?.params?.tripId;

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

  const result = await TravelBuddyServices.GetTravelBuddiesDB(tripId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Potential travel buddies retrieved successfully",
    data: result,
  });
});

const UpdateTravelBuddy = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization as string;
  const id = req?.params?.buddyId;

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

  const result = await TravelBuddyServices.UpdateTravelBuddiesDB(id, req?.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Travel buddy request responded successfully",
    data: result,
  });
});

export const TravelBuddyController = {
  GetTravelBuddies,
  UpdateTravelBuddy,
};
