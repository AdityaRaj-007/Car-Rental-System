import { NextFunction, Response } from "express";
import { AuthRequest } from "../../shared/middlewares/authMiddleware";
import { GlobalError } from "../../shared/utils/GlobalError";
import * as bookingService from "./booking.service";
import { DeleteBookingParams, UpdateBookingParams } from "./booking.types";
import { error } from "node:console";

export const CreateBooking = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req.user;
    if (!user) {
      throw new GlobalError(401, "UNAUTHORIZED");
    }

    const payload = req.body;

    const booking = await bookingService.createBooking({ user, payload });

    return res.status(201).json({
      success: true,
      data: {
        message: "Booking created successfully",
        bookingId: booking.id,
        totalCost: booking.days * booking.rentPerDay.toNumber(),
      },
      error: null,
    });
  } catch (err) {
    next(err);
  }
};

export const GetBookings = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req.user;
    if (!user) {
      throw new GlobalError(401, "UNAUTHORIZED");
    }

    const params = req.query;
    const bookingData = await bookingService.getUserBookings({ user, params });

    return res.status(200).json({
      success: true,
      data: bookingData,
      error: null,
    });
  } catch (err) {
    next(err);
  }
};

export const UpdateBookingDetailsAndStatus = async (
  req: AuthRequest<UpdateBookingParams, {}, {}, {}>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req.user;
    if (!user) {
      throw new GlobalError(401, "UNAUTHORIZED");
    }

    const bookingId = req.params.bookingId;

    const payload = req.body;

    const updatedDetails = await bookingService.updateBookingDetails({
      user,
      bookingId,
      payload,
    });

    return res.status(200).json({
      success: true,
      data: {
        message: "Booking updated successfully",
        booking: updatedDetails,
      },
      error: null,
    });
  } catch (err) {
    next(err);
  }
};

export const DeleteBooking = async (
  req: AuthRequest<DeleteBookingParams>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req.user;
    if (!user) {
      throw new GlobalError(401, "UNAUTHORIZED");
    }
    const bookingId = req.params.bookingId;

    const detail = await bookingService.deleteBooking({ user, bookingId });

    return res
      .status(200)
      .json({
        success: true,
        data: { message: "Booking deleted successfully" },
      });
  } catch (err) {
    next(err);
  }
};
