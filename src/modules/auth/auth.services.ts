import th from "zod/v4/locales/th.js";
import { User } from "../../generated/prisma/client";
import { GlobalError } from "../../shared/utils/GlobalError";
import * as userRepository from "./auth.repository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET not provided");
}

export const userSignup = async (
  username: string,
  password: string,
): Promise<User> => {
  const hashedPassword = await bcrypt.hash(password, 12);

  const usernameExists = await userRepository.findUsername(username);
  if (usernameExists) {
    throw new GlobalError(409, "USERNAME_EXISTS");
  }

  return await userRepository.createUser(username, hashedPassword);
};

export const userLogin = async (username: string, password: string) => {
  const userExists = await userRepository.findUsername(username);

  if (!userExists) {
    throw new GlobalError(401, "INVALID_CREDENTIALS");
  }

  const matchPassword = await bcrypt.compare(password, userExists.password);

  if (!matchPassword) {
    throw new GlobalError(401, "INVALID_CREDENTIALS");
  }

  const token = jwt.sign(
    { id: userExists.id, username: userExists.username },
    JWT_SECRET,
  );

  return token;
};
