import express from "express";
import { AuthRoutes } from "../modules/Auth/auth.route";
import { TripsRoutes } from "../modules/Trip/trip.route";
import { UserProfileRoutes } from "../modules/UserProfile/user.route";
import { TravelBuddyRoutes } from "../TravelBuddy/travelBuddy.route";
import { TravelBuddyRequestRoutes } from "../TravelBuddyRequest/TravelBuddyRequest.route";
import { UsersRoutes } from "../modules/User/users.route";
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
    path: "/api/users",
    route: UsersRoutes,
  },
  {
    path: "/api",
    route: UserProfileRoutes,
  },
  {
    path: "/api/travel-buddies",
    route: TravelBuddyRoutes,
  },
  {
    path: "/api/trip",
    route: TravelBuddyRequestRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
