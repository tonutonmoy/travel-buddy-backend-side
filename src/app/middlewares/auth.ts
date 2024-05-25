import { NextFunction, Request, Response } from "express";

import catchAsync from "../../shared/catchAsync";
import config from "../../config";
import { jwtHelpers } from "../../helpers/jwtHelpers";

type TRole = "Admin" | "User";
const auth = (...requiredRoles: TRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req?.headers?.authorization;

    if (!token) {
      throw new Error("Unauthorized Access");
    }

    let decoded;

    try {
      decoded = jwtHelpers.verifyToken(token, config.jwt.jwt_secret as string);
    } catch (err) {
      throw new Error("Unauthorized Access");
    }

    const { role } = decoded;

    //  role checking
    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new Error("Unauthorized Access");
    }

    next();
  });
};

export default auth;
