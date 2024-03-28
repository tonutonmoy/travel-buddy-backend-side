import prisma from "../../../shared/prisma";

// Create Trip
const CreateTripeDB = async (email: string, payload: any) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email,
    },
  });

  payload.userId = user?.id;
  const result = await prisma.trip.create({ data: payload });
  return result;
};

// Get Trips
const GetTripsDB = async (payload: any) => {
  const result = await prisma.trip.findMany();
  return result;
};

export const TripServices = {
  CreateTripeDB,
  GetTripsDB,
};
