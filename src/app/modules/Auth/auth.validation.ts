import { z } from "zod";

const UserValidation = z.object({
  email: z.string().email(),
  name: z.string(),
  password: z.string(),
});
export const AuthValidation = {
  UserValidation,
};
