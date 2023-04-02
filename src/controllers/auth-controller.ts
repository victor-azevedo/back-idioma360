import { handleRequestError } from "@/middlewares";
import { SignInBody, SignUpBody } from "@/schemas";
import { usersService } from "@/services";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function signUpUser(req: Request, res: Response) {
  const newUser = req.body as SignUpBody;

  try {
    await usersService.signUpStudent(newUser);
    return res.sendStatus(httpStatus.CREATED);
  } catch (error) {
    handleRequestError(error, res);
  }
}

export async function signIn(req: Request, res: Response) {
  const userSignInBody = req.body as SignInBody;

  try {
    const token = await usersService.signIn(userSignInBody);
    return res.status(httpStatus.OK).send({ token });
  } catch (error) {
    handleRequestError(error, res);
  }
}
