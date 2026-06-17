import { Booking } from "../../generated/prisma/client";
import {
  BookingSummary,
  CreateBooking,
  DeleteBooking,
  GetBooking,
  UpdateBooking,
} from "./booking.types";
import * as bookingRepository from "./booking.repository";
import { GlobalError } from "../../shared/utils/GlobalError";

export const createBooking = async ({
  user,
  payload,
}: CreateBooking): Promise<Booking> => {
  const userId = user.id;
  const { carName, days, rentPerDay } = payload;
  return await bookingRepository.createBooking(
    userId,
    carName,
    days,
    rentPerDay,
  );
};

export const getUserBookings = async ({
  user,
  params,
}: GetBooking): Promise<Booking | Booking[] | BookingSummary> => {
  const bookingId = params.bookingId;
  const summary = params.summary;

  if (bookingId) {
    const booking = await bookingRepository.getBookingDetails(bookingId);
    if (!booking || booking.userId !== user.id) {
      throw new GlobalError(404, "BOOKING_NOT_FOUND");
    }
    return booking;
  }

  if (summary === true) {
    const bookings = await bookingRepository.getUserBookings(user.id);

    const totalSpending = bookings.reduce((accumulator, booking) => {
      return accumulator + booking.rentPerDay.toNumber() * booking.days;
    }, 0);
    return {
      userId: user.id,
      username: user.username,
      totalBookings: bookings.length,
      totalAmountSpent: totalSpending,
    };
  }

  return await bookingRepository.getUserBookings(user.id);
};

export const updateBookingDetails = async ({
  user,
  bookingId,
  payload,
}: UpdateBooking) => {
  const booking = await bookingRepository.getBookingDetails(bookingId);

  if (!booking) {
    throw new GlobalError(404, "BOOKING_NOT_FOUND");
  }

  if (booking.userId !== user.id) {
    throw new GlobalError(403, "FORBIDDEN");
  }

  const details = await bookingRepository.updateBookingDetail({
    bookingId,
    payload,
  });

  return {
    ...details,
    totalCost: details.days * details.rentPerDay.toNumber(),
  };
};

export const deleteBooking = async ({ user, bookingId }: DeleteBooking) => {
  const booking = await bookingRepository.getBookingDetails(bookingId);

  if (!booking) {
    throw new GlobalError(404, "BOOKING_NOT_FOUND");
  }

  if (booking.userId !== user.id) {
    throw new GlobalError(403, "FORBIDDEN");
  }

  const details = await bookingRepository.deleteBookingDetail(bookingId);
  return details;
};
