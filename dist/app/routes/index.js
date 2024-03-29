"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("../modules/Auth/auth.route");
const trip_route_1 = require("../modules/Trip/trip.route");
const user_route_1 = require("../modules/UserProfile/user.route");
const travelBuddy_route_1 = require("../TravelBuddy/travelBuddy.route");
const TravelBuddyRequest_route_1 = require("../TravelBuddyRequest/TravelBuddyRequest.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/api",
        route: auth_route_1.AuthRoutes,
    },
    {
        path: "/api",
        route: trip_route_1.TripsRoutes,
    },
    {
        path: "/api",
        route: user_route_1.UserProfileRoutes,
    },
    {
        path: "/api/travel-buddies",
        route: travelBuddy_route_1.TravelBuddyRoutes,
    },
    {
        path: "/api/trip",
        route: TravelBuddyRequest_route_1.TravelBuddyRequestRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
