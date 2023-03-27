import { AuthenticatedRequest } from "@/middlewares/authentication-middleware";
import { AddressBody } from "@/schemas";
import { addressService } from "@/services";
import { StateUF } from "@prisma/client";
import { Response } from "express";
import httpStatus from "http-status";
import { handleRequestError } from "../middlewares";

async function postUserAddress(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const userAddress = req.body as AddressBody;
  try {
    await addressService.createUserAddress(userId, userAddress);
    return res.sendStatus(httpStatus.CREATED);
  } catch (error) {
    handleRequestError(error, res);
  }
}

async function getUserAddress(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const userAddress = await addressService.findUserAddress(userId);
    return res.status(httpStatus.OK).send(userAddress);
  } catch (error) {
    handleRequestError(error, res);
  }
}

async function getStates(req: AuthenticatedRequest, res: Response) {
  try {
    const states = await addressService.findStates();
    return res.status(httpStatus.OK).send(states);
  } catch (error) {
    handleRequestError(error, res);
  }
}

async function getUfCities(req: AuthenticatedRequest, res: Response) {
  const uf = req.query.uf as StateUF;
  try {
    const ufCities = await addressService.findUFCities(uf);
    return res.status(httpStatus.OK).send(ufCities);
  } catch (error) {
    handleRequestError(error, res);
  }
}

export const addressController = {
  postUserAddress,
  getUserAddress,
  getStates,
  getUfCities,
};
