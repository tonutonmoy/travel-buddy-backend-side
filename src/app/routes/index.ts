import express from "express";
import { AuthRoutes } from "../modules/Auth/auth.route";
import { TripsRoutes } from "../modules/Trip/trip.route";
import { UserProfileRoutes } from "../modules/UserProfile/user.route";
const router = express.Router();

const moduleRoutes = [
  {
    path: "/api",
    route: AuthRoutes,
  },
  {
    path: "/api",
    route: TripsRoutes,
  },
  {
    path: "/api",
    route: UserProfileRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
