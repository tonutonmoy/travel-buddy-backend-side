"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserProfileRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const AuthConstant_1 = require("../Auth/AuthConstant");
const router = express_1.default.Router();
router.get("/profile", (0, auth_1.default)(AuthConstant_1.USER_ROLE.admin, AuthConstant_1.USER_ROLE.user), user_controller_1.UserProfileController.GetUserProfile);
router.put("/profile", (0, auth_1.default)(AuthConstant_1.USER_ROLE.admin, AuthConstant_1.USER_ROLE.user), user_controller_1.UserProfileController.UpdateUserProfile);
exports.UserProfileRoutes = router;
