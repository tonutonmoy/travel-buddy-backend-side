"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const zod_1 = require("zod");
const zodErrorHandler_1 = __importDefault(require("../error/zodErrorHandler"));
const library_1 = require("@prisma/client/runtime/library");
const prismaErrorHandler_1 = __importDefault(require("../error/prismaErrorHandler"));
const globalErrorHandler = (err, req, res, next) => {
    if (err instanceof zod_1.ZodError) {
        const response = (0, zodErrorHandler_1.default)(err);
        return res.status(http_status_1.default.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: response.message,
            errorDetails: response.errorDetails,
        });
    }
    if (err instanceof library_1.PrismaClientKnownRequestError) {
        const response = (0, prismaErrorHandler_1.default)(err);
        return res.status(http_status_1.default.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: response.message,
            errorDetails: response.errorDetails,
        });
    }
    console.log(err, "hello");
    res.status(http_status_1.default.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: err.message || "Something went wrong!",
        errorDetails: err,
    });
};
exports.default = globalErrorHandler;
