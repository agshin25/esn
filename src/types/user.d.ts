import { z } from "zod";
import authValidations from "../validations/auth.validations";

export type registerDTO = z.infer<typeof authValidations.register>;
