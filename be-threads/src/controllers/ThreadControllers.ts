import { Request, Response } from "express";
import ThreadServices from "../services/ThreadServices";
import ThreadQueue from "../queue/ThreadQueue";
import { Route, Get, Post } from "tsoa";

@Route("threads")
export default class ThreadControllers {
  @Get("/")
  async find(req: Request, res: Response) {
    try {
      const response = await ThreadServices.find(req.query);
      
      return res.status(200).json(response);
    } catch (err) {
      return res
        .status(500)
        .json({ error: "Something went wrong on the server!" });
    }
  }

  @Get("/{id}")
  async findOne(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);

      const response = await ThreadServices.findOne(id);
      return res.status(200).json(response);
    } catch (err) {
      return res
        .status(500)
        .json({ error: "Something went wrong on the server!" });
    }
  }
  
  @Post("/")
  create(req: Request, res: Response) {
    ThreadQueue.create(req, res)
  }
}