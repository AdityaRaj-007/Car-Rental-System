import z from "zod";

export const CreateBookingSchema = z.object({
  body: z.object({
    carName: z.string(),
    days: z.number(),
    rentPerDay: z.number(),
  }),
});

export const GetBookingSchema = z.object({
  query: z
    .object({
      bookingId: z.string().optional(),
      summary: z.boolean().optional(),
    })
    .optional(),
});

export const UpdateBookingSchema = z.object({
  body: z.object({
    carName: z.string().optional(),
    days: z.number().optional(),
    rentPerDay: z.number().optional(),
    status: z.string().optional(),
  }),
  params: z.object({
    bookingId: z.string(),
  }),
});

export const DeleteBookingSchema = z.object({
  params: z.object({
    bookingId: z.string(),
  }),
});
