import { prisma } from "../../infrastructure/db";

export const findUsername = async (username: string) => {
  return await prisma.user.findUnique({ where: { username } });
};

export const createUser = async (username: string, password: string) => {
  const userData = await prisma.user.create({ data: { username, password } });
  return userData;
};
