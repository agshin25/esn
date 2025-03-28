import { RequestHandler, Router } from "express";
import bookingController from "../controllers/booking.controller";

const bookingRouter = Router();

bookingRouter.get("/", bookingController.getBookings);
bookingRouter.delete("/remove/:id", bookingController.removeBooking);
bookingRouter.post("/create", bookingController.bookCard as RequestHandler);

export default bookingRouter;
