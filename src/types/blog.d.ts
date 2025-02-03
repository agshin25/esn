import { z } from "zod";
import blogValidations from "../validations/blog.validations";

export type CreateBlogDto = z.infer<typeof blogValidations.create>

export type UpdateBlogDto = z.infer<typeof blogValidations.update>