import express from "express";
import { AuthController } from "./auth.controller";
import zodValidation from "../../../shared/zodValidation";
import { AuthValidation } from "./auth.validation";
import { USER_ROLE } from "./AuthConstant";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post(
  "/register",
  zodValidation(AuthValidation.RegisterValidation),
  AuthController.RegistrationUser
);
router.post(
  "/login",
  zodValidation(AuthValidation.loginValidation),
  AuthController.loginUser
);
router.put(
  "/changePassword",
  auth(USER_ROLE.admin, USER_ROLE.user),
  zodValidation(AuthValidation.changePassword),
  AuthController.ChangePassword
);

export const AuthRoutes = router;
