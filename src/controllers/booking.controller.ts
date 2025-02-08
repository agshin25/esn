import { NextFunction, Request, Response } from "express";
import bookingService from "../services/booking.service";

const bookCard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req.user);
    const response = await bookingService.create(
      (req.user as { id: number }).id
    );
    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};

const getBookings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await bookingService.getAll(
      (req.user as { id: number }).id
    );
    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};

const removeBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await bookingService.remove(parseInt(req.params.id));
    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};

export default {
  bookCard,
  getBookings,
  removeBooking,
};
