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
const router = express_1.default.Router();
router.post("/trips", (0, zodValidation_1.default)(trip_validation_1.TripValidation.TripSchema), trip_controller_1.TripController.CreateTrip);
router.get("/trips", trip_controller_1.TripController.GetTrips);
exports.TripsRoutes = router;
