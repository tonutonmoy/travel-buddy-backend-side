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
exports.TripController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const trip_service_1 = require("./trip.service");
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const config_1 = __importDefault(require("../../../config"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const trip_constant_1 = require("./trip.constant");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const CreateTrip = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    const result = yield trip_service_1.TripServices.CreateTripeDB(email, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: "Trip created successfully",
        data: result,
    });
}));
const GetTrips = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = req === null || req === void 0 ? void 0 : req.query;
    const filters = (0, pick_1.default)(req === null || req === void 0 ? void 0 : req.query, trip_constant_1.userFilterableFields);
    const options = (0, pick_1.default)(req === null || req === void 0 ? void 0 : req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const result = yield trip_service_1.TripServices.GetTripsDB(searchTerm, filters, options);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Trips retrieved successfully",
        data: result,
    });
}));
exports.TripController = {
    CreateTrip,
    GetTrips,
};
