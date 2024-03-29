"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
const UserValidation = zod_1.z.object({
    email: zod_1.z.string().email(),
    name: zod_1.z.string(),
    password: zod_1.z.string(),
});
exports.AuthValidation = {
    UserValidation,
};
