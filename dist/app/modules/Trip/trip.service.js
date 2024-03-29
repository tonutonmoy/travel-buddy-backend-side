"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripServices = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
// Create Trip
const CreateTripeDB = (email, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email,
        },
    });
    payload.userId = user === null || user === void 0 ? void 0 : user.id;
    const result = yield prisma_1.default.trip.create({ data: payload });
    return result;
});
// Get Trips
const GetTripsDB = (searchTerm, params, options) => __awaiter(void 0, void 0, void 0, function* () {
    const filterData = __rest(params, []);
    const { page, limit, skip } = paginationHelper_1.paginationHelper.calculatePagination(options);
    let whereConditions = { AND: [] }; // Initialize whereConditions with proper type
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
    const result = yield prisma_1.default.trip.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? {
                [options.sortBy]: options.sortOrder,
            }
            : {
                createdAt: "desc",
            },
    });
    const total = yield prisma_1.default.trip.count({
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
});
exports.TripServices = {
    CreateTripeDB,
    GetTripsDB,
};
