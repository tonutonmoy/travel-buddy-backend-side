"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TravelBuddyRequestValidation = void 0;
const zod_1 = require("zod");
const RequestValidation = zod_1.z.object({
    userId: zod_1.z.string(),
    name: zod_1.z.string(),
    email: zod_1.z.string(),
    number: zod_1.z.string(),
    country: zod_1.z.string(),
    city: zod_1.z.string(),
});
exports.TravelBuddyRequestValidation = {
    RequestValidation,
};
