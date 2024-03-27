import express from "express";
import { AuthController } from "./auth.controller";
import zodValidation from "../../../shared/zodValidation";
import { AuthValidation } from "./auth.validation";

const router = express.Router();

router.post(
  "/register",
  zodValidation(AuthValidation.UserValidation),
  AuthController.RegistrationUser
);
router.post("/login", AuthController.loginUser);

export const AuthRoutes = router;
