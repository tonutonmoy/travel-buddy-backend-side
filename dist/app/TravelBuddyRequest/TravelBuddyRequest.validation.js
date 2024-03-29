"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TravelBuddyRequestValidation = void 0;
const zod_1 = require("zod");
const RequestValidation = zod_1.z.object({
    userId: zod_1.z.string(),
});
exports.TravelBuddyRequestValidation = {
    RequestValidation,
};
