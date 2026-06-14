import { NextFunction, Request, Response } from "express";
import * as authService from "./auth.services";
import { success } from "zod";

export const UserSignup = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { username, password } = req.body;
    console.log(username, password);
    const userData = await authService.userSignup(username, password);

    return res.status(201).json({
      success: true,
      data: {
        message: "User created successfully",
        userId: userData.id,
      },
    });
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

export const UserLogin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { username, password } = req.body;
    const token = await authService.userLogin(username, password);

    return res.status(200).json({
      success: true,
      data: {
        message: "Login Successfully",
        token,
      },
      error: null,
    });
  } catch (err) {
    return next(err);
  }
};
