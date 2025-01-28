import dataSource from "../config/database";
import { User } from "../models/User.entity";
import { registerDTO } from "../types/user";

const userRepo = dataSource.getRepository(User);

const saveUser = async (user: registerDTO) => {
  const newUser = userRepo.create(user);
  await newUser.save();
  return newUser;
};

const findUser = async (username: string) => {
  const user = await userRepo.findOne({
    where: { username },
  });
  return user;
};

export default {
  saveUser,
  findUser,
};
