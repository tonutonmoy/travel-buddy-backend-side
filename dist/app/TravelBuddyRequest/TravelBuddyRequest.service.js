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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TravelBuddyRequestServices = void 0;
const prisma_1 = __importDefault(require("../../shared/prisma"));
const GetTravelBuddyRequestDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(payload);
    const result = yield prisma_1.default.travelBuddy.findMany({
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
});
const GetGotTravelBuddyRequestDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(payload);
    const filteredTrips = yield prisma_1.default.user.findFirst({
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
    const result2 = filteredTrips === null || filteredTrips === void 0 ? void 0 : filteredTrips.trip.filter((t) => { var _a; return ((_a = t === null || t === void 0 ? void 0 : t.trip) === null || _a === void 0 ? void 0 : _a.length) > 0; });
    const result = [];
    result2 === null || result2 === void 0 ? void 0 : result2.forEach(a => {
        var _a;
        (_a = a === null || a === void 0 ? void 0 : a.trip) === null || _a === void 0 ? void 0 : _a.forEach(a => result.push(a));
    });
    return result;
});
const CreateTravelBuddyRequestDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(payload);
    const result = yield prisma_1.default.travelBuddy.create({
        data: payload,
    });
    return result;
});
const UpdateGotTravelBuddyRequestDB = (payload, id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(payload);
    const result = yield prisma_1.default.travelBuddy.update({
        where: {
            id: id
        },
        data: payload,
    });
    return result;
});
exports.TravelBuddyRequestServices = {
    CreateTravelBuddyRequestDB,
    GetTravelBuddyRequestDB,
    GetGotTravelBuddyRequestDB,
    UpdateGotTravelBuddyRequestDB
};
