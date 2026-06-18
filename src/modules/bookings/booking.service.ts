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

export const getUserBookings = async ({ user, params }: GetBooking) => {
  const bookingId = params.bookingId;
  const summary = params.summary;

  if (bookingId) {
    const booking = await bookingRepository.getBookingDetails(bookingId);
    if (!booking || booking.userId !== user.id) {
      throw new GlobalError(404, "BOOKING_NOT_FOUND");
    }
    const { createdAt, userId, ...data } = booking;
    return {
      ...data,
      totalAmount: booking.rentPerDay.toNumber() * booking.days,
    };
  }

  if (summary === "true") {
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

  const allBookings = await bookingRepository.getUserBookings(user.id);

  const bookingData = allBookings.map((booking) => {
    const { createdAt, userId, ...data } = booking;
    return {
      ...data,
      totalAmount: booking.days * booking.rentPerDay.toNumber(),
    };
  });

  return bookingData;
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

  const { createdAt, userId, ...data } = details;

  return {
    ...data,
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
