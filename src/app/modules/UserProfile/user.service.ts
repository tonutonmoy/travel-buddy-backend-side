import prisma from "../../../shared/prisma";

// Get Profile
const GetUserProfileDB = async (email: string) => {
  const result = await prisma.user.findUniqueOrThrow({
    where: {
      email,
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return result;
};
const UpdateUserProfileDB = async (email: string, payload: any) => {
  const result = await prisma.user.update({
    where: {
      email: email,
    },
    data: payload,
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return result;
};

export const UserProfileServices = {
  GetUserProfileDB,
  UpdateUserProfileDB,
};
