"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersServices = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
// Get All Users
const GetAllUsersDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            photo: true,
            age: true,
            bio: true,
            userStatus: true,
            role: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    return result;
});
//  Update User Status
const UpdateUserStatusDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.update({
        where: {
            id: id,
        },
        data: payload,
        select: {
            id: true,
            name: true,
            email: true,
            photo: true,
            age: true,
            bio: true,
            userStatus: true,
            role: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    return result;
});
exports.UsersServices = {
    UpdateUserStatusDB,
    GetAllUsersDB,
};
