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
exports.TravelBuddyRequestController = void 0;
const config_1 = __importDefault(require("../../config"));
const jwtHelpers_1 = require("../../helpers/jwtHelpers");
const catchAsync_1 = __importDefault(require("../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../shared/sendResponse"));
const TravelBuddyRequest_service_1 = require("./TravelBuddyRequest.service");
const prisma_1 = __importDefault(require("../../shared/prisma"));
const GetTravelBuddyRequest = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    const result = yield TravelBuddyRequest_service_1.TravelBuddyRequestServices.GetTravelBuddyRequestDB(user === null || user === void 0 ? void 0 : user.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Travel buddy request data retrieved successfully",
        data: result,
    });
}));
const GetGotTravelBuddyRequest = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    const result = yield TravelBuddyRequest_service_1.TravelBuddyRequestServices.GetGotTravelBuddyRequestDB(user === null || user === void 0 ? void 0 : user.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Travel buddy request data retrieved successfully",
        data: result,
    });
}));
const CreateTravelBuddyRequest = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = req.headers.authorization;
    const tripId = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.tripId;
    const body = req === null || req === void 0 ? void 0 : req.body;
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
    body.tripId = tripId;
    const result = yield TravelBuddyRequest_service_1.TravelBuddyRequestServices.CreateTravelBuddyRequestDB(body);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: "Travel buddy request sent successfully",
        data: result,
    });
}));
const UpdateGotTravelBuddyRequest = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const token = req.headers.authorization;
    const id = (_b = req === null || req === void 0 ? void 0 : req.params) === null || _b === void 0 ? void 0 : _b.id;
    const body = req === null || req === void 0 ? void 0 : req.body;
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
    console.log(id, body, 'hello');
    const result = yield TravelBuddyRequest_service_1.TravelBuddyRequestServices.UpdateGotTravelBuddyRequestDB(body, id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: " Update Got Travel buddy request  successfully",
        data: result,
    });
}));
exports.TravelBuddyRequestController = {
    CreateTravelBuddyRequest,
    GetTravelBuddyRequest,
    GetGotTravelBuddyRequest,
    UpdateGotTravelBuddyRequest
};
