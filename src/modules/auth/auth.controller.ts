import type { Request, Response } from "express";
import { userDataValidation } from "../../utilities/userdataValidation.js";
import sendError from "../../utilities/sendError.js";
import authServices from "./auth.service.js";
import sendSuccess from "../../utilities/sendSuccess.js";

const createUser = async (req: Request, res: Response) => {
  const validatedMessage = userDataValidation(req.body);
  if (validatedMessage) {
    return sendError(res, 400, "Validation error", validatedMessage);
  }

  try {
    const result = await authServices.createUserIntoDB(req.body);

    // console.log("create user:  ", result);
    if (result.rows.length) {
      return sendSuccess(
        res,
        201,
        "User registered successfully",
        result.rows[0],
      );
    }
  } catch (error: any) {
    // console.log(error);
    if (error.code === "23505") {
      return sendError(
        res,
        400,
        "Duplicate value",
        "Duplicate email is not acceptable. Email must be unique. Please provide an unique email.",
      );
    }

    return sendError(res, 500, "Internal server error", error.message);
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const result = await authServices.loginUserIntoDB(req.body);

    // console.log(result);
    if (!result) {
      return sendError(
        res,
        401,
        "Invalid credentials",
        "Invalid email or password",
      );
    }

    return sendSuccess(res, 200, "Login successful", {
      token: result.token,
      user: result.user,
    });
  } catch (error: any) {
    // console.log(error);

    sendError(res, 500, "Failed to Login", error.message);
  }
};
const authControllers = {
  createUser,
  loginUser,
};

export default authControllers;
