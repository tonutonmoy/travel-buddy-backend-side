"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const zodValidation_1 = __importDefault(require("../../../shared/zodValidation"));
const trip_controller_1 = require("./trip.controller");
const trip_validation_1 = require("./trip.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const AuthConstant_1 = require("../Auth/AuthConstant");
const router = express_1.default.Router();
router.post("/trips", (0, auth_1.default)(AuthConstant_1.USER_ROLE.user), (0, zodValidation_1.default)(trip_validation_1.TripValidation.TripSchema), trip_controller_1.TripController.CreateTrip);
router.get("/trips", trip_controller_1.TripController.GetTrips);
router.get("/tripsForAdmin", (0, auth_1.default)(AuthConstant_1.USER_ROLE.admin), trip_controller_1.TripController.getAllTripeForAdmin);
router.get("/trips/:id", trip_controller_1.TripController.GetSingleTrips);
router.put("/trips/update/:id", (0, auth_1.default)(AuthConstant_1.USER_ROLE.admin, AuthConstant_1.USER_ROLE.user), trip_controller_1.TripController.UpdateTrip);
router.delete("/trips/delete/:id", (0, auth_1.default)(AuthConstant_1.USER_ROLE.admin, AuthConstant_1.USER_ROLE.user), trip_controller_1.TripController.DeleteTrip);
router.get("/tripsPosted", (0, auth_1.default)(AuthConstant_1.USER_ROLE.user), trip_controller_1.TripController.GetPostedTrips);
exports.TripsRoutes = router;
