import express from "express";

import zodValidation from "../../../shared/zodValidation";

import { TripController } from "./trip.controller";
import { TripValidation } from "./trip.validation";

const router = express.Router();

router.post(
  "/trips",
  zodValidation(TripValidation.TripSchema),
  TripController.CreateTrip
);
router.get("/trips", TripController.GetTrips);

export const TripsRoutes = router;