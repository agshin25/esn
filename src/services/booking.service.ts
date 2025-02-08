import { urlencoded } from "express";
import dataSource from "../config/database";
import { Booking } from "../models/Booking.entity";
import { AppError, NotFoundError } from "../utils/error.utils";
import { findUserById } from "./auth.service";

const bookingRepo = dataSource.getRepository(Booking);

const create = async (userId: number) => {
  const user = await findUserById(userId);

  if (!user) {
    throw new NotFoundError("User was not found");
  }

  const bk = bookingRepo.create();
  bk.user = user;
  return await bookingRepo.save(bk);
};

const remove = async (id: number) => {
  const bk = await bookingRepo.findOne({ where: { id } });

  if (!bk) {
    throw new NotFoundError("Booking was not found");
  }

  return await bookingRepo.remove(bk);
};

const getAll = async (userId: number) => {
  const user = await findUserById(userId);

  if (!user) {
    throw new NotFoundError("User was not found");
  }

  return user.bookings;
};

export default {
  create,
  remove,
  getAll,
};
