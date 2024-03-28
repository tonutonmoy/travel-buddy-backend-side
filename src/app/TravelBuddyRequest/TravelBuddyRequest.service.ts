import prisma from "../../shared/prisma";

const CreateTravelBuddyRequestDB = async (payload: any) => {
  const result = await prisma.travelBuddy.create({
    data: payload,
  });
  return result;
};

export const TravelBuddyRequestServices = {
  CreateTravelBuddyRequestDB,
};
