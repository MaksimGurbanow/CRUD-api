import { Request, Response } from "express";
import { Model } from "mongoose";
import { Handler } from "../types/interface";


export const get: Handler = async <T>(req: Request, res: Response, model: Model<T>): Promise<Response> => {
  try {
    const data: T[] = await model.find({});
    return res.status(200).json(data);
  } catch (error: any) {
    const {message} = error;
    return res.status(500).json({message})
  }
}

export const getById: Handler = async <T>(req: Request, res: Response, model: Model<T>): Promise<Response> => {
  try {
    const { id } = req.params;
    const data = await model.findById(id);

    if (!data) {
      return res.status(404).json({message: `${model.modelName} not found`})
    }

    return res.status(200).json(data);
  } catch (error: any) {
    const {message} = error;
    return res.status(500).json({message})
  }
}

export const create: Handler = async <T>(req: Request, res: Response, model: Model<T>): Promise<Response> => {
  try {
    const data = await model.create(req.body);
    return res.status(200).json(data)
  } catch (error: any) {
    const {message} = error;
    return res.status(500).json({message})
  }
}

export const remove: Handler = async <T>(req: Request, res: Response, model: Model<T>): Promise<Response> => {
  try {
    const { id } = req.params;
    const data = await model.findByIdAndDelete(id);

    if (!data) {
      return res.status(404).json({message: `${model.modelName} not found`})
    }

    console.log(data);
    return res.status(200).json({message: `${model.modelName} is deleted`});
  } catch (error: any) {
    const {message} = error;
    return res.status(500).json({message})
  }
}

export const update: Handler = async <T>(req: Request, res: Response, model: Model<T>): Promise<Response> => {
  try {
    const { id } = req.params;
    const data = await model.findByIdAndUpdate(id, req.body);

    if (!data) {
      return res.status(404).json({message: `${model.modelName} not found`})
    }

    const updatedData = await model.findById(id);

    return res.status(200).json(updatedData);
  } catch (error: any) {
    const {message} = error;
    return res.status(500).json({message})
  }
}