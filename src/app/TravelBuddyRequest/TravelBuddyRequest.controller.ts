import { Request, Response } from "express";
import config from "../../config";
import { jwtHelpers } from "../../helpers/jwtHelpers";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { TravelBuddyRequestServices } from "./TravelBuddyRequest.service";
import prisma from "../../shared/prisma";

const CreateTravelBuddyRequest = catchAsync(
  async (req: Request, res: Response) => {
    const token = req.headers.authorization as string;

    const tripId = req?.params?.tripId;
    const body = req?.body;

    console.log(body, tripId);

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
    body.tripId = tripId;

    const result = await TravelBuddyRequestServices.CreateTravelBuddyRequestDB(
      body
    );

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Travel buddy request sent successfully",
      data: result,
    });
  }
);

export const TravelBuddyRequestController = {
  CreateTravelBuddyRequest,
};
