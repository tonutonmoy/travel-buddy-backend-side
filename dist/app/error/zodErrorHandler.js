"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zodErrorHandler = (err) => {
    let errorMessage = "";
    let errorDetails = [];
    const errorSources = err.issues.map((issue) => {
        var _a;
        errorDetails.push({
            field: issue === null || issue === void 0 ? void 0 : issue.path[0],
            message: `${issue === null || issue === void 0 ? void 0 : issue.path[0]} field is require`,
        });
        let message = `${issue === null || issue === void 0 ? void 0 : issue.path[((_a = issue === null || issue === void 0 ? void 0 : issue.path) === null || _a === void 0 ? void 0 : _a.length) - 1]} field is ${issue === null || issue === void 0 ? void 0 : issue.message} . `;
        return message;
    });
    errorMessage = errorSources.join(" ");
    return {
        message: errorMessage,
        errorDetails: {
            issus: errorDetails,
        },
    };
};
exports.default = zodErrorHandler;
