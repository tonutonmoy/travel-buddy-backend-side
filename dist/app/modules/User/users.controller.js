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
exports.UsersController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const config_1 = __importDefault(require("../../../config"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const users_service_1 = require("./users.service");
const GeTAllUsers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    if (!token) {
        throw new Error("Unauthorized Access");
    }
    const { email } = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.jwt_secret);
    const user = yield prisma_1.default.user.findUnique({
        where: { email: email },
    });
    if (!user) {
        throw new Error("Unauthorized Access");
    }
    const { userStatus } = user;
    if (userStatus !== "Activate") {
        throw new Error("Your id is blocked");
    }
    const result = yield users_service_1.UsersServices.GetAllUsersDB();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Users retrieved successfully",
        data: result,
    });
}));
const UpdateUserStatus = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = req.headers.authorization;
    if (!token) {
        throw new Error("Unauthorized Access");
    }
    const { email } = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.jwt_secret);
    const user = yield prisma_1.default.user.findUnique({
        where: { email: email },
    });
    if (!user) {
        throw new Error("Unauthorized Access");
    }
    const { userStatus } = user;
    if (userStatus !== "Activate") {
        throw new Error("Your id is blocked");
    }
    const result = yield users_service_1.UsersServices.UpdateUserStatusDB((_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id, req === null || req === void 0 ? void 0 : req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 203,
        success: true,
        message: "User Status updated successfully",
        data: result,
    });
}));
exports.UsersController = {
    UpdateUserStatus,
    GeTAllUsers,
};
