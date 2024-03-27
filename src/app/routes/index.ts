import express from "express";
import { AuthRoutes } from "../modules/Auth/auth.route";
const router = express.Router();

const moduleRoutes = [
  {
    path: "/register",
    route: AuthRoutes,
  },
  {
    path: "/login",
    route: AuthRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
