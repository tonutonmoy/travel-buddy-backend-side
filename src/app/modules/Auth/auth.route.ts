import express from "express";
import { AuthController } from "./auth.controller";
import zodValidation from "../../../shared/zodValidation";
import { AuthValidation } from "./auth.validation";

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
  zodValidation(AuthValidation.changePassword),
  AuthController.ChangePassword
);

export const AuthRoutes = router;
