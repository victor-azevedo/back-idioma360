import { AuthenticatedRequest } from "@/middlewares";
import { OfferingBody, OfferingsQuerySchema, ParamsSchema } from "@/schemas";
import { offeringsService } from "@/services";
import { Response } from "express";
import httpStatus from "http-status";
import { handleRequestError } from "../middlewares";

async function getAll(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { enrollments } = req.query as OfferingsQuerySchema;
  const { status } = req.query as OfferingsQuerySchema;

  try {
    const offerings = await offeringsService.findAll({
      userId,
      includeEnrollments: enrollments === "true" ? true : false,
      status,
    });
    return res.status(httpStatus.OK).send(offerings);
  } catch (error) {
    handleRequestError(error, res);
  }
}

async function getById(req: AuthenticatedRequest, res: Response) {
  const { id } = req.params as ParamsSchema;

  try {
    const offering = await offeringsService.findByIdWithClasses({ id: parseInt(id) });
    return res.status(httpStatus.OK).send(offering);
  } catch (error) {
    handleRequestError(error, res);
  }
}

async function createOffer(req: AuthenticatedRequest, res: Response) {
  const offering = req.body as OfferingBody;

  try {
    const { id } = await offeringsService.createOffer(offering);
    return res.status(httpStatus.CREATED).send({ offeringId: id });
  } catch (error) {
    handleRequestError(error, res);
  }
}

async function updateOffer(req: AuthenticatedRequest, res: Response) {
  const offering = req.body as OfferingBody;
  const { id } = req.params as ParamsSchema;

  try {
    await offeringsService.updateOffer({ id: parseInt(id), offering });
    return res.sendStatus(httpStatus.NO_CONTENT);
  } catch (error) {
    handleRequestError(error, res);
  }
}

async function deleteOffer(req: AuthenticatedRequest, res: Response) {
  const { id } = req.params as ParamsSchema;

  try {
    await offeringsService.deleteOffer(parseInt(id));
    return res.sendStatus(httpStatus.NO_CONTENT);
  } catch (error) {
    handleRequestError(error, res);
  }
}

export const offeringsController = {
  getAll,
  createOffer,
  updateOffer,
  deleteOffer,
  getById,
};
