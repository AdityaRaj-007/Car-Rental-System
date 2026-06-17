import Router from "express";
import { validate } from "../../shared/middlewares/validationMiddleware";
import {
  CreateBookingSchema,
  DeleteBookingSchema,
  GetBookingSchema,
  UpdateBookingSchema,
} from "./booking.schema";
import {
  CreateBooking,
  GetBookings,
  UpdateBookingDetailsAndStatus,
} from "./booking.controller";

const router = Router();

router.post("/", validate(CreateBookingSchema), CreateBooking);
router.get("/", validate(GetBookingSchema), GetBookings);
router.put(
  "/:bookingId",
  validate(UpdateBookingSchema),
  UpdateBookingDetailsAndStatus,
);

router.delete("/:bookingId", validate(DeleteBookingSchema));

export default router;
