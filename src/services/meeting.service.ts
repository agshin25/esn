import dataSource from "../config/database";
import { Meeting } from "../models/Meeting.entity";
import { NotFoundError } from "../utils/error.utils";
import { findUserById } from "./auth.service";

const meetingRepo = dataSource.getRepository(Meeting);

const arrangeMeeting = async (date: Date, userId: number) => {
  const user = await findUserById(userId);

  if (!user) {
    throw new NotFoundError("User was not found");
  }

  const mt = meetingRepo.create();
  mt.consultant = user;
  mt.date = date;

  return await meetingRepo.save(mt);
};

const getAvailableMeetings = async () => {
  return await meetingRepo.find();
};

export const findMeetingById = async (id: number) => {
  return await meetingRepo.findOne({ where: { id } });
};

export default {
  arrangeMeeting,
  getAvailableMeetings,
};
