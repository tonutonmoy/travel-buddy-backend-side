import { z } from "zod";

const TripSchema = z.object({
  destination: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  budget: z.number().int(),
  activities: z.array(z.string()),
});
export const TripValidation = {
  TripSchema,
};
