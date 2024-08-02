import express from "express";
import { TravelBuddyRequestController } from "./TravelBuddyRequest.controller";
import zodValidation from "../../shared/zodValidation";
import { TravelBuddyRequestValidation } from "./TravelBuddyRequest.validation";
import auth from "../middlewares/auth";
import { USER_ROLE } from "../modules/Auth/AuthConstant";

const router = express.Router();

router.get(
  "/request",
  auth(USER_ROLE.user),

  TravelBuddyRequestController.GetTravelBuddyRequest
);
router.get(
  "/gotRequest",
  auth(USER_ROLE.user),

  TravelBuddyRequestController.GetGotTravelBuddyRequest
);
router.put(
  "/updateGotRequest/:id",
  auth(USER_ROLE.user),

  TravelBuddyRequestController.UpdateGotTravelBuddyRequest
);
router.post(
  "/:tripId/request",
  auth(USER_ROLE.user),
  zodValidation(TravelBuddyRequestValidation.RequestValidation),

  TravelBuddyRequestController.CreateTravelBuddyRequest
);

export const TravelBuddyRequestRoutes = router;
