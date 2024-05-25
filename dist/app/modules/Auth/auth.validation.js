"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
const RegisterValidation = zod_1.z.object({
    email: zod_1.z.string().email(),
    name: zod_1.z.string(),
    password: zod_1.z.string(),
});
const loginValidation = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string(),
});
const changePassword = zod_1.z.object({
    oldPassword: zod_1.z.string(),
    newPassword: zod_1.z.string(),
});
exports.AuthValidation = {
    RegisterValidation,
    loginValidation,
    changePassword,
};
