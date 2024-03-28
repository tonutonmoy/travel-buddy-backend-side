import { Prisma } from "@prisma/client";
import { paginationHelper } from "../../../helpers/paginationHelper";
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

const GetTripsDB = async (searchTerm: any, params: any, options: any) => {
  const { ...filterData } = params;
  const { page, limit, skip } = paginationHelper.calculatePagination(options);

  let whereConditions: any = { AND: [] }; // Initialize whereConditions with proper type

  if (searchTerm) {
    const orConditions = [];

    // Handle budget filter
    if (!isNaN(searchTerm)) {
      orConditions.push({ budget: { equals: Number(searchTerm) } });
    }

    // Handle destination filter
    if (typeof searchTerm === "string" && searchTerm.trim().length > 0) {
      orConditions.push({
        destination: { contains: searchTerm, mode: "insensitive" },
      });
    }

    // Push conditions into AND
    if (orConditions.length > 0) {
      whereConditions.AND.push({ OR: orConditions });
    }
  }

  if (filterData) {
    const andConditions = [];

    // destination
    if (filterData.destination) {
      andConditions.push({
        destination: { contains: filterData.destination, mode: "insensitive" },
      });
    }

    // startDate
    if (filterData.startDate) {
      andConditions.push({
        startDate: { equals: filterData.startDate },
      });
    }
    // endDate
    if (filterData.endDate) {
      andConditions.push({
        endDate: { equals: filterData.endDate },
      });
    }
    if (filterData.minBudget && filterData.maxBudget) {
      andConditions.push({
        budget: {
          gte: Number(filterData.minBudget),
          lte: Number(filterData.maxBudget),
        },
      });
    }

    // Push conditions into AND
    if (andConditions.length > 0) {
      whereConditions.AND.push(...andConditions);
    }
  }

  const result = await prisma.trip.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: "desc",
          },
  });

  const total = await prisma.trip.count({
    where: whereConditions,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const TripServices = {
  CreateTripeDB,
  GetTripsDB,
};
