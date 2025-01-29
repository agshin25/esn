import { z } from "zod";

const register = z.object({
  email: z.string().email(),
  password: z.string().min(5).max(15),
});

export default {
  register,
};
