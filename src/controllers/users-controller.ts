import { SignUpBody } from "@/schemas";
import { usersService } from "@/services";
import { Request, Response } from "express";
import httpStatus from "http-status";
import { handleRequestError } from "../middlewares";

export async function signUp(req: Request, res: Response) {
  const newUser = req.body as SignUpBody;

  try {
    const userInserted = await usersService.signUp(newUser);
    return res.status(httpStatus.CREATED).send(userInserted);
  } catch (error) {
    handleRequestError(error, res);
  }
}
