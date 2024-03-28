import { z } from "zod";

const RequestValidation = z.object({
  userId: z.string(),
});
export const TravelBuddyRequestValidation = {
  RequestValidation,
};
