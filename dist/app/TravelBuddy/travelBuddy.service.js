"use strict";
// Create Travel Buddy Request
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
exports.TravelBuddyServices = void 0;
const prisma_1 = __importDefault(require("../../shared/prisma"));
// Get Travel Buddies For a Specific Trip
const GetTravelBuddiesDB = (tripId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.travelBuddy.findMany({
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
});
// Update Respond to Travel Buddy Request
const UpdateTravelBuddiesDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.travelBuddy.update({
        where: {
            id: id,
        },
        data: payload,
    });
    return result;
});
exports.TravelBuddyServices = {
    GetTravelBuddiesDB,
    UpdateTravelBuddiesDB,
};
