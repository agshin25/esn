import { NextFunction, Request, RequestHandler, Response } from "express";
import meetingService from "../services/meeting.service";

export interface UserRequest extends Request {
  user: {
    id: number;
  };
}

const arrangeMeeting = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  const { date } = req.body;
  const { user } = req;

  try {
    const response = await meetingService.arrangeMeeting(date, user.id);
    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};

const getAvailableMeetings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await meetingService.getAvailableMeetings();
    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};

export default {
  getAvailableMeetings,
  arrangeMeeting: arrangeMeeting as RequestHandler,
};
