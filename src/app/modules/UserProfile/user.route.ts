import express from "express";
import { UserProfileController } from "./user.controller";

const router = express.Router();

router.get(
  "/profile",

  UserProfileController.GetUserProfile
);
router.put("/profile", UserProfileController.UpdateUserProfile);

export const UserProfileRoutes = router;
