import { z } from "zod";

const RequestValidation = z.object({
  userId: z.string(),
  name: z.string(),
  email: z.string(),
  number: z.string(),
  country: z.string(),
  city: z.string(),
});
export const TravelBuddyRequestValidation = {
  RequestValidation,
};
