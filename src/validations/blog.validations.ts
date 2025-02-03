import { z } from "zod";

export const create = z.object({
    title: z.string().min(1, "Title is required").max(255, "Title must be less than 255 characters"),
    content: z.string().min(1, "Content is required"),
    slug: z.string().optional(),
    authorName: z.string().min(1, "Author name is required").max(255, "Author name must be less than 255 characters").optional(),
});

export const update = z.object({
    title: z.string().max(255, "Title must be less than 255 characters").optional(),
    content: z.string().optional(),
    slug: z.string().optional(), 
    authorName: z.string().max(255, "Author name must be less than 255 characters").optional(),
});

const blogValidations = {
    create,
    update
}

export default blogValidations