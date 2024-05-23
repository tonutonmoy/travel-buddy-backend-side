import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";

import sendResponse from "../../../shared/sendResponse";
import { TripServices } from "./trip.service";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import config from "../../../config";
import pick from "../../../shared/pick";
import { userFilterableFields } from "./trip.constant";
import prisma from "../../../shared/prisma";

const CreateTrip = catchAsync(async (req: Request, res: Response) => {
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

  const result = await TripServices.CreateTripeDB(email, req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Trip created successfully",
    data: result,
  });
});

const GetTrips = catchAsync(async (req: Request, res: Response) => {
  const { searchTerm } = req?.query;
  const filters = pick(req?.query, userFilterableFields);
  const options = pick(req?.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await TripServices.GetTripsDB(searchTerm, filters, options);
  console.log(req?.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Trips retrieved successfully",
    data: result,
  });
});

const GetSingleTrips = catchAsync(async (req: Request, res: Response) => {
  const result = await TripServices.getSingleTripeDB(req?.params?.id);
  console.log("hello");

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Trips retrieved successfully",
    data: result,
  });
});
const GetPostedTrips = catchAsync(async (req: Request, res: Response) => {
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
  const result = await TripServices.getPostedTripeDB(user?.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Trips retrieved successfully",
    data: result,
  });
});

const UpdateTrip = catchAsync(async (req: Request, res: Response) => {
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
  const result = await TripServices.UpdateTripeDB(req?.params?.id, req?.body);

  sendResponse(res, {
    statusCode: 202,
    success: true,
    message: "Trip  update successfully",
    data: result,
  });
});
const DeleteTrip = catchAsync(async (req: Request, res: Response) => {
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
  const result = await TripServices.DeleteTripeDB(req?.params?.id);

  sendResponse(res, {
    statusCode: 203,
    success: true,
    message: "Trips delete successfully",
    data: result,
  });
});
export const TripController = {
  CreateTrip,
  GetTrips,
  GetSingleTrips,
  GetPostedTrips,
  UpdateTrip,
  DeleteTrip,
};
