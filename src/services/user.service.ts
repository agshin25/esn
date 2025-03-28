import { role } from "../types/role";
import { NotFoundError } from "../utils/error.utils";
import { findUserById } from "./auth.service";

const changeRole = async (userId: number, newRole: role) => {
  const user = await findUserById(userId);

  if (!user) {
    throw new NotFoundError("User was not found");
  }

  user.role = newRole;

  return await user.save();
};

export default { changeRole };
