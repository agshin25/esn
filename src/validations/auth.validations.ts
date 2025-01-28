import { z } from "zod";

const register = z.object({
  username: z.string().min(5).max(15),
  password: z.string().min(5).max(15),
});

export default {
  register,
};
