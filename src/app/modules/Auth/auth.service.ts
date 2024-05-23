import { jwtHelpers } from "../../../helpers/jwtHelpers";

import bcrypt from "bcrypt";
import config from "../../../config";
import { Secret } from "jsonwebtoken";
import prisma from "../../../shared/prisma";

// Registration
const RegistrationDB = async (payload: any) => {
  const hashedPassword: string = await bcrypt.hash(payload.password, 12);

  payload.password = hashedPassword;

  const result = await prisma.user.create({ data: payload });

  const { id, name, email, createdAt, updatedAt } = result;

  return { id, name, email, createdAt, updatedAt };
};

// login
const loginUserDB = async (payload: any) => {
  const userData = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (!userData) {
    console.log("nei");
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
      id: userData.id,
      role: userData.role,
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

const ChangePasswordDB = async (id: string, newPassword: string) => {
  console.log(id, "id");
  const hashedPassword: string = await bcrypt.hash(newPassword, 12);

  const result = await prisma.user.update({
    where: { id },
    data: { password: hashedPassword },
  });
  return result;
};

export const AuthServices = {
  RegistrationDB,
  loginUserDB,
  ChangePasswordDB,
};
