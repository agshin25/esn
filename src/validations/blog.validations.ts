import { z } from "zod";

const create = z.object({
    title: z
        .string()
        .min(5, "Title must be at least 5 characters long")
        .max(100, "Title cannot exceed 100 characters"),
    content: z
        .string()
        .min(20, "Content must be at least 20 characters long"),
})

const blogValidations = {
    create
}

export default blogValidations