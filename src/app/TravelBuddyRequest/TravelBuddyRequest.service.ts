import prisma from "../../shared/prisma";

const GetTravelBuddyRequestDB = async (payload: any) => {
  console.log(payload);
  const result = await prisma.travelBuddy.findMany({
    where: {
      userId: payload,
    },
    include: {
      trip: {
        select: {
          destination: true,
          startDate: true,
          endDate: true,
          travelType: true,
          location: true,
        },
      },
    },
  });
  return result;
};
const GetGotTravelBuddyRequestDB = async (payload: any) => {
  console.log(payload);
  const filteredTrips = await prisma.user.findFirst({
    where: {
      id: payload,
    },
    include: {
      trip: {
        include: {
          trip: true,
          
          
        },
      },
    },
  });
  const result2 = filteredTrips?.trip.filter((t:any) => t?.trip?.length > 0);
  const result: any=[];
  result2?.forEach(a=>{

    a?.trip?.forEach(a=> result.push(a))
  })
  return result;
};
const CreateTravelBuddyRequestDB = async (payload: any) => {
  console.log(payload);
  const result = await prisma.travelBuddy.create({
    data: payload,
  });
  return result;
};
const UpdateGotTravelBuddyRequestDB = async (payload: any,id:string) => {
  console.log(payload);
  const result = await prisma.travelBuddy.update({
    where:{
      id: id
    }
    ,
    data: payload,
  });
  return result;
};

export const TravelBuddyRequestServices = {
  CreateTravelBuddyRequestDB,
  GetTravelBuddyRequestDB,
  GetGotTravelBuddyRequestDB,
  UpdateGotTravelBuddyRequestDB
};
