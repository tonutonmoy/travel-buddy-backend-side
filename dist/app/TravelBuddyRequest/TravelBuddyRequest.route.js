"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TravelBuddyRequestRoutes = void 0;
const express_1 = __importDefault(require("express"));
const TravelBuddyRequest_controller_1 = require("./TravelBuddyRequest.controller");
const zodValidation_1 = __importDefault(require("../../shared/zodValidation"));
const TravelBuddyRequest_validation_1 = require("./TravelBuddyRequest.validation");
const auth_1 = __importDefault(require("../middlewares/auth"));
const AuthConstant_1 = require("../modules/Auth/AuthConstant");
const router = express_1.default.Router();
router.get("/request", (0, auth_1.default)(AuthConstant_1.USER_ROLE.user), TravelBuddyRequest_controller_1.TravelBuddyRequestController.GetTravelBuddyRequest);
router.get("/gotRequest", (0, auth_1.default)(AuthConstant_1.USER_ROLE.user), TravelBuddyRequest_controller_1.TravelBuddyRequestController.GetGotTravelBuddyRequest);
router.put("/updateGotRequest/:id", (0, auth_1.default)(AuthConstant_1.USER_ROLE.user), TravelBuddyRequest_controller_1.TravelBuddyRequestController.UpdateGotTravelBuddyRequest);
router.post("/:tripId/request", (0, auth_1.default)(AuthConstant_1.USER_ROLE.user), (0, zodValidation_1.default)(TravelBuddyRequest_validation_1.TravelBuddyRequestValidation.RequestValidation), TravelBuddyRequest_controller_1.TravelBuddyRequestController.CreateTravelBuddyRequest);
exports.TravelBuddyRequestRoutes = router;
