import express from "express";
import { UsersController } from "./users.controller";

const router = express.Router();

router.get(
  "/",

  UsersController.GeAllUsers
);
router.put("/:id", UsersController.UpdateUserStatus);

export const UsersRoutes = router;
