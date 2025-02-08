import dataSource from "../config/database";
import config from "../config";
import bcrypt from "bcrypt";
import { User } from "../models/User.entity";
import { registerDTO } from "../types/user";
import { AppError, NotFoundError } from "../utils/error.utils";
import { encode } from "../utils/jwt.utils";
import { sendMail, WELCOME_TEMPLATE } from "../utils/mailer.utils";

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

  // await sendMail({
  //   email: user.email,
  //   subject: "Welcome to ESN",
  //   template: WELCOME_TEMPLATE,
  // });

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

  const token = encode({ id: user.id });
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

export const findUserById = async (id: number) => {
  console.log("Hello World");
  const user = await userRepo.findOne({
    where: { id },
    relations: ["bookings"],
  });
  return user;
};

export default {
  login,
  register,
};
