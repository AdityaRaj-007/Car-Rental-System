import { prisma } from "../../infrastructure/db";
import { BookingDetail } from "./booking.types";

export const createBooking = async (
  userId: string,
  carName: string,
  days: number,
  rentPerDay: number,
) => {
  return await prisma.booking.create({
    data: { userId, carName, days, rentPerDay, status: "BOOKED" },
  });
};

export const getBookingDetails = async (bookingId: string) => {
  return await prisma.booking.findUnique({ where: { id: bookingId } });
};

export const getUserBookings = async (userId: string) => {
  return await prisma.booking.findMany({
    where: { userId, status: { not: "CANCELLED" } },
  });
};

export const updateBookingDetail = async ({
  payload,
  bookingId,
}: BookingDetail) => {
  return await prisma.booking.update({
    where: { id: bookingId },
    data: payload,
  });
};

export const deleteBookingDetail = async (bookingId: string) => {
  return await prisma.booking.delete({ where: { id: bookingId } });
};
