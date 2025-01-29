import dataSource from "../config/database";
import config from "../config";
import bcrypt from "bcrypt";
import { User } from "../models/User.entity";
import { registerDTO } from "../types/user";
import { AppError, NotFoundError } from "../utils/error.utils";
import { encode } from "../utils/jwt.utils";

const userRepo = dataSource.getRepository(User);

const register = async ({ email, password }: registerDTO) => {
  const candidate = await findUser(email);

  if (candidate) {
    throw new AppError("This user already exists", 500);
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await saveUser({
    email,
    password: hashedPassword,
  });

  return user;
};

const login = async ({ email, password }: registerDTO) => {
  const user = await findUser(email);

  if (!user) {
    throw new NotFoundError("Either password or username is incorrect");
  }

  const matched = await bcrypt.compare(password, user.password);

  if (!matched) {
    throw new NotFoundError("Either password or username is incorrect");
  }

  const token = encode({ user: user.id });
  return { token, user: { ...user, password: undefined } };
};

const saveUser = async (user: registerDTO) => {
  return await userRepo.save(user);
};

const findUser = async (email: string) => {
  const user = await userRepo.findOne({
    where: { email },
  });
  return user;
};

export default {
  login,
  register,
};
