"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripValidation = void 0;
const zod_1 = require("zod");
const TripSchema = zod_1.z.object({
    destination: zod_1.z.string(),
    startDate: zod_1.z.string(),
    endDate: zod_1.z.string(),
    travelType: zod_1.z.string(),
    location: zod_1.z.string(),
    itinerary: zod_1.z.string(),
    description: zod_1.z.string(),
    photos: zod_1.z.array(zod_1.z.string()),
});
exports.TripValidation = {
    TripSchema,
};
