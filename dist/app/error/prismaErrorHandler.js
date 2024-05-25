"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prismaErrorHandler = (err) => {
    var _a;
    let errorMessage = "";
    let errorDetails = [];
    if (err.code === "P2002") {
        // Unique constraint violation error
        errorMessage = `${(_a = err === null || err === void 0 ? void 0 : err.meta) === null || _a === void 0 ? void 0 : _a.target[0]} already exists`;
        errorDetails = err;
    }
    return {
        message: errorMessage,
        errorDetails: {
            issus: errorDetails,
        },
    };
};
exports.default = prismaErrorHandler;
