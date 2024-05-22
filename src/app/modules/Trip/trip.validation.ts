import { z } from "zod";

const TripSchema = z.object({
  destination: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  travelType: z.string(),
  location: z.string(),
  itinerary: z.string(),

  description: z.string(),
  photos: z.array(z.string()),
});
export const TripValidation = {
  TripSchema,
};
