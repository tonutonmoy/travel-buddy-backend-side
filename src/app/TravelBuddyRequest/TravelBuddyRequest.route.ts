import express from "express";
import { TravelBuddyRequestController } from "./TravelBuddyRequest.controller";
import zodValidation from "../../shared/zodValidation";
import { TravelBuddyRequestValidation } from "./TravelBuddyRequest.validation";

const router = express.Router();

router.post(
  "/:tripId/request",
  zodValidation(TravelBuddyRequestValidation.RequestValidation),

  TravelBuddyRequestController.CreateTravelBuddyRequest
);

export const TravelBuddyRequestRoutes = router;
