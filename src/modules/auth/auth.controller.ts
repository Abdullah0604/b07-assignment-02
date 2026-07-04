import type { Request, Response } from "express";
import { userDataValidation } from "../../utilities/userdataValidation.js";
import sendError from "../../utilities/sendError.js";
import authServices from "./auth.service.js";

const createUser = async (req: Request, res: Response) => {
  const validatedMessage = userDataValidation(req.body);
  if (validatedMessage) {
    return sendError(res, 400, "Validation error", validatedMessage);
  }

  try {
    const result = await authServices.loginUserIntoDB();
  } catch (error: any) {}
};
const loginUser = async (req: Request, res: Response) => {};
const authControllers = {
  createUser,
  loginUser,
};

export default authControllers;
