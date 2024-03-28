// Create Travel Buddy Request

import prisma from "../../shared/prisma";

// Get Travel Buddies For a Specific Trip
const GetTravelBuddiesDB = async (tripId: string) => {
  const result = await prisma.travelBuddy.findMany({
    where: { tripId: tripId },
    select: {
      id: true,
      tripId: true,
      userId: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      user: true,
    },
  });

  return result;
};

// Update Respond to Travel Buddy Request
const UpdateTravelBuddiesDB = async (id: string, payload: any) => {
  const result = await prisma.travelBuddy.update({
    where: {
      id: id,
    },
    data: payload,
  });
  return result;
};

export const TravelBuddyServices = {
  GetTravelBuddiesDB,
  UpdateTravelBuddiesDB,
};
