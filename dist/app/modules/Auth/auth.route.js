"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
const zodValidation_1 = __importDefault(require("../../../shared/zodValidation"));
const auth_validation_1 = require("./auth.validation");
const router = express_1.default.Router();
router.post("/register", (0, zodValidation_1.default)(auth_validation_1.AuthValidation.UserValidation), auth_controller_1.AuthController.RegistrationUser);
router.post("/login", auth_controller_1.AuthController.loginUser);
exports.AuthRoutes = router;
