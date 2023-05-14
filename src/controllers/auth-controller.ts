import { handleRequestError } from "@/middlewares";
import { SignInBody, SignInUserTestBody, SignUpBody } from "@/schemas";
import { authService } from "@/services";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function signUpUser(req: Request, res: Response) {
  const newUser = req.body as SignUpBody;

  try {
    await authService.signUpStudent(newUser);
    return res.sendStatus(httpStatus.CREATED);
  } catch (error) {
    handleRequestError(error, res);
  }
}

export async function signIn(req: Request, res: Response) {
  const userSignInBody = req.body as SignInBody;

  try {
    const token = await authService.signIn(userSignInBody);
    return res.status(httpStatus.OK).send({ token });
  } catch (error) {
    handleRequestError(error, res);
  }
}

export async function signInUserTest(req: Request, res: Response) {
  const { userRole } = req.body as SignInUserTestBody;

  try {
    const token = await authService.signInUserTest(userRole);
    return res.status(httpStatus.OK).send({ token });
  } catch (error) {
    handleRequestError(error, res);
  }
}
