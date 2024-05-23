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
router.get("/trips/:id", TripController.GetSingleTrips);
router.put("/trips/update/:id", TripController.UpdateTrip);
router.delete("/trips/delete/:id", TripController.DeleteTrip);
router.get("/tripsPosted", TripController.GetPostedTrips);

export const TripsRoutes = router;
