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
exports.AuthServices = void 0;
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../../config"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
// Registration
const RegistrationDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { profile } = payload, user = __rest(payload, ["profile"]);
    const hashedPassword = yield bcrypt_1.default.hash(user.password, 12);
    user.password = hashedPassword;
    const result = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const userResult = yield prisma_1.default.user.create({ data: user });
        if (!userResult) {
            throw new Error("something went wrong");
        }
        profile.userId = userResult.id;
        yield transactionClient.userProfile.create({
            data: profile,
        });
        return userResult;
    }));
    const { id, name, email, createdAt, updatedAt } = result;
    return { id, name, email, createdAt, updatedAt };
});
// login
const loginUserDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email: payload.email,
        },
    });
    if (!userData) {
        throw new Error(" Unauthorized Access!");
    }
    const isCorrectPassword = yield bcrypt_1.default.compare(payload.password, userData.password);
    if (!isCorrectPassword) {
        throw new Error("Password incorrect!");
    }
    const accessToken = jwtHelpers_1.jwtHelpers.generateToken({
        email: userData.email,
    }, config_1.default.jwt.jwt_secret, config_1.default.jwt.expires_in);
    const { id, name, email } = userData;
    return {
        id,
        name,
        email,
        token: accessToken,
    };
});
exports.AuthServices = {
    RegistrationDB,
    loginUserDB,
};
