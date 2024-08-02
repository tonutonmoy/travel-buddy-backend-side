import { Request, Response } from "express";
import config from "../../config";
import { jwtHelpers } from "../../helpers/jwtHelpers";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { TravelBuddyRequestServices } from "./TravelBuddyRequest.service";
import prisma from "../../shared/prisma";

const GetTravelBuddyRequest = catchAsync(
  async (req: Request, res: Response) => {
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
    const { userStatus } = user;

    if (userStatus !== "Activate") {
      throw new Error("Your id is blocked");
    }

    const result = await TravelBuddyRequestServices.GetTravelBuddyRequestDB(
      user?.id
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Travel buddy request data retrieved successfully",
      data: result,
    });
  }
);
const GetGotTravelBuddyRequest = catchAsync(
  async (req: Request, res: Response) => {
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
    const { userStatus } = user;

    if (userStatus !== "Activate") {
      throw new Error("Your id is blocked");
    }

    const result = await TravelBuddyRequestServices.GetGotTravelBuddyRequestDB(
      user?.id
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Travel buddy request data retrieved successfully",
      data: result,
    });
  }
);

const CreateTravelBuddyRequest = catchAsync(
  async (req: Request, res: Response) => {
    const token = req.headers.authorization as string;

    const tripId = req?.params?.tripId;
    const body = req?.body;

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
    const { userStatus } = user;

    if (userStatus !== "Activate") {
      throw new Error("Your id is blocked");
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

const UpdateGotTravelBuddyRequest = catchAsync(
  async (req: Request, res: Response) => {
    const token = req.headers.authorization as string;

    const id = req?.params?.id;
    const body = req?.body;

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
    const { userStatus } = user;

    if (userStatus !== "Activate") {
      throw new Error("Your id is blocked");
    }
    
    console.log(id,body,'hello')

    const result = await TravelBuddyRequestServices.UpdateGotTravelBuddyRequestDB(
      body,id
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: " Update Got Travel buddy request  successfully",
      data: result,
    });
  }
);

export const TravelBuddyRequestController = {
  CreateTravelBuddyRequest,
  GetTravelBuddyRequest,
  GetGotTravelBuddyRequest,
  UpdateGotTravelBuddyRequest
};
