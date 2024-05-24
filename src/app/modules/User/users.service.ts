import prisma from "../../../shared/prisma";

// Get All Users
const GetAllUsersDB = async () => {
  const result = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      photo: true,
      age: true,
      bio: true,
      userStatus: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return result;
};

//  Update User Status
const UpdateUserStatusDB = async (id: string, payload: any) => {
  const result = await prisma.user.update({
    where: {
      id: id,
    },
    data: payload,
    select: {
      id: true,
      name: true,
      email: true,
      photo: true,
      age: true,
      bio: true,
      userStatus: true,
      role: true,

      createdAt: true,
      updatedAt: true,
    },
  });
  return result;
};

export const UsersServices = {
  UpdateUserStatusDB,
  GetAllUsersDB,
};
