import { jwtHelpers } from "../../../helpers/jwtHelpers";

import bcrypt from "bcrypt";
import config from "../../../config";
import { Secret } from "jsonwebtoken";
import prisma from "../../../shared/prisma";

// Registration
const RegistrationDB = async (payload: any) => {
  const { profile, ...user } = payload;

  const hashedPassword: string = await bcrypt.hash(user.password, 12);

  user.password = hashedPassword;

  const result = await prisma.$transaction(async (transactionClient) => {
    const userResult = await prisma.user.create({ data: user });

    if (!userResult) {
      throw new Error("something went wrong");
    }

    profile.userId = userResult.id;

    await transactionClient.userProfile.create({
      data: profile,
    });

    return userResult;
  });

  const { id, name, email, createdAt, updatedAt } = result;

  return { id, name, email, createdAt, updatedAt };
};

// login
const loginUserDB = async (payload: any) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
    },
  });
  if (!userData) {
    throw new Error(" Unauthorized Access!");
  }
  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.password,
    userData.password
  );
  if (!isCorrectPassword) {
    throw new Error("Password incorrect!");
  }
  const accessToken = jwtHelpers.generateToken(
    {
      email: userData.email,
    },
    config.jwt.jwt_secret as string,
    config.jwt.expires_in as string
  );
  const { id, name, email } = userData;
  return {
    id,
    name,
    email,
    token: accessToken,
  };
};

export const AuthServices = {
  RegistrationDB,
  loginUserDB,
};
