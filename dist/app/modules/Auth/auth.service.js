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
exports.AuthServices = void 0;
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../../config"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
// Registration
const RegistrationDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield bcrypt_1.default.hash(payload.password, 12);
    payload.password = hashedPassword;
    const result = yield prisma_1.default.user.create({ data: payload });
    const { id, name, email, createdAt, updatedAt } = result;
    return { id, name, email, createdAt, updatedAt };
});
// login
const loginUserDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield prisma_1.default.user.findUnique({
        where: {
            email: payload.email,
        },
    });
    if (!userData) {
        console.log("nei");
        throw new Error(" Unauthorized Access!");
    }
    const { userStatus, password } = userData;
    if (userStatus !== "Activate") {
        throw new Error("Your id is blocked");
    }
    const isCorrectPassword = yield bcrypt_1.default.compare(payload.password, userData.password);
    if (!isCorrectPassword) {
        throw new Error("Password incorrect!");
    }
    const accessToken = jwtHelpers_1.jwtHelpers.generateToken({
        email: userData.email,
        id: userData.id,
        role: userData.role,
    }, config_1.default.jwt.jwt_secret, config_1.default.jwt.expires_in);
    const { id, name, email } = userData;
    return {
        id,
        name,
        email,
        token: accessToken,
    };
});
const ChangePasswordDB = (id, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(id, "id");
    const hashedPassword = yield bcrypt_1.default.hash(newPassword, 12);
    const result = yield prisma_1.default.user.update({
        where: { id },
        data: { password: hashedPassword },
    });
    return result;
});
exports.AuthServices = {
    RegistrationDB,
    loginUserDB,
    ChangePasswordDB,
};
