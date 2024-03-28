import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";

import sendResponse from "../../../shared/sendResponse";
import { TripServices } from "./trip.service";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import config from "../../../config";

const CreateTrip = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization as string;

  if (!token) {
    throw new Error("Unauthorized Access");
  }

  const { email } = jwtHelpers.verifyToken(
    token,
    config.jwt.jwt_secret as string
  );

  const result = await TripServices.CreateTripeDB(email, req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Trip created successfully",
    data: result,
  });
});

const GetTrips = catchAsync(async (req: Request, res: Response) => {
  const result = await TripServices.GetTripsDB(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Trips retrieved successfully",
    data: result,
  });
});

export const TripController = {
  CreateTrip,
  GetTrips,
};
