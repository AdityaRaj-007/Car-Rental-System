import z from "zod";
import { DeleteBookingSchema, UpdateBookingSchema } from "./booking.schema";
import { Status } from "../../generated/prisma/enums";

export type CreateBooking = {
  user: {
    id: string;
    username: string;
  };
  payload: {
    carName: string;
    days: number;
    rentPerDay: number;
  };
};

export type GetBooking = {
  user: {
    id: string;
    username: string;
  };
  params: {
    bookingId?: string;
    summary?: boolean;
  };
};

export type BookingSummary = {
  userId: string;
  username: string;
  totalBookings: number;
  totalAmountSpent: number;
};

export type UpdateBooking = {
  user: {
    id: string;
    username: string;
  };
  bookingId: string;
  payload: {
    carName?: string;
    days?: number;
    rentPerDay?: number;
    status?: Status;
  };
};

export type BookingDetail = {
  bookingId: string;
  payload: {
    carName?: string;
    days?: number;
    rentPerDay?: number;
    status?: Status;
  };
};

export type DeleteBooking = {
  user: {
    id: string;
    username: string;
  };
  bookingId: string;
};

export type UpdateBookingParams = z.infer<typeof UpdateBookingSchema>["params"];
export type DeleteBookingParams = z.infer<typeof DeleteBookingSchema>["params"];
