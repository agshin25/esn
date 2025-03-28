import { Router } from "express";
import meetingController from "../controllers/meeting.controller";

const meetingRouter = Router();

meetingRouter.post("/arrange", meetingController.arrangeMeeting);
meetingRouter.get("/available", meetingController.getAvailableMeetings);

export default meetingRouter;
