import dataSource from "../config/database";
import { Booking } from "../models/Booking.entity";
import { NotFoundError } from "../utils/error.utils";
import { findUserById } from "./auth.service";
import { BOOKING_TEMPLATE, sendMail } from "../utils/mailer.utils";
import { findMeetingById } from "./meeting.service";

const bookingRepo = dataSource.getRepository(Booking);

const create = async (userId: number, meetingId: number) => {
  const user = await findUserById(userId);
  const meeting = await findMeetingById(meetingId);

  if (!user || !meeting) {
    throw new NotFoundError("Either user or meeting was not found");
  }

  const bk = bookingRepo.create();
  bk.user = user;
  bk.meeting = meeting;

  // await sendMail({
  //   email: user.email,
  //   subject: "Consulation was booked!",
  //   template: BOOKING_TEMPLATE,
  // });

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
