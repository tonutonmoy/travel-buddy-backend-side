import express from "express";
import { UserProfileController } from "./user.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../Auth/AuthConstant";

const router = express.Router();

router.get(
  "/profile",
  auth(USER_ROLE.admin, USER_ROLE.user),

  UserProfileController.GetUserProfile
);
router.put(
  "/profile",
  auth(USER_ROLE.admin, USER_ROLE.user),
  UserProfileController.UpdateUserProfile
);

export const UserProfileRoutes = router;
