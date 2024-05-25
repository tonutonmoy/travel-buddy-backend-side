import express from "express";
import { UsersController } from "./users.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../Auth/AuthConstant";

const router = express.Router();

router.get(
  "/",
  auth(USER_ROLE.admin, USER_ROLE.user),

  UsersController.GeTAllUsers
);
router.put("/:id", auth(USER_ROLE.admin), UsersController.UpdateUserStatus);

export const UsersRoutes = router;
