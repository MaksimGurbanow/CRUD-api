import { Response, Request } from "express";
import { Model } from "mongoose";

export type Handler = <T>(req: Request, res: Response, model: Model<T>) => Promise<Response>;

export const createRouteHandler = <T>(handler: Handler, model: Model<T>) => (req: Request, res: Response) => {
  handler<T>(req, res, model);
};

