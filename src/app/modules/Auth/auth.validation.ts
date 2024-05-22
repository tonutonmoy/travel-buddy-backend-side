import { z } from "zod";

const RegisterValidation = z.object({
  email: z.string().email(),
  name: z.string(),
  password: z.string(),
});
const loginValidation = z.object({
  email: z.string().email(),

  password: z.string(),
});
export const AuthValidation = {
  RegisterValidation,
  loginValidation,
};
