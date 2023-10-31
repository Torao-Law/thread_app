import { Thread } from "../entities/Thread";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { createThreadSchema, updateThreadSchema } from "../utils/validator/Thread";

export default new class ThreadServices {
  private readonly ThreadRepository: Repository<Thread> = AppDataSource.getRepository(Thread)

  async find(reqQuery?: any): Promise<any> {
    try {
      const limit = parseInt(reqQuery.limit as string);
  
      const threads = await this.ThreadRepository.find({
        relations: ["users", "likes", "replies"],
        order: {
          id: "DESC",
        },
        take: limit,
      });
  
      let newResponse = threads.map(element => ({
        ...element,
        replies_count: element.replies.length,
        likes_count: element.likes.length,
      }));
  
      return newResponse;
    } catch (err) {
      console.error("Error in ThreadsService:", err); // Log the actual error
      throw new Error("Something went wrong in server!");
    }
  }
  

  async findOne(id: number): Promise<any> {
    try {
      const thread = await this.ThreadRepository.findOne({
        where: {
          id: id,
        },
        relations: ["users", "replies", "likes"],
      });

      console.log(thread);
      

      const newResponse = {
        ...thread,
        replies_count: thread.replies.length,
        likes_count: thread.likes.length,
      };

      return newResponse;
    } catch (err) {
      throw new Error("Something wrong in server!");
    }
  }

  async update(id: number, reqBody: any): Promise<any> {
    try {
      console.log(reqBody);
      
      const thread = await this.ThreadRepository.findOne({
        where: {
          id: id,
        },
      });

      if(!thread) {
        throw new Error("Thread ID not found")
      }
      
      const { error } = updateThreadSchema.validate(reqBody);
      if(error) {
        throw new Error()
      }

      if(reqBody.content != "") {
        thread.content = reqBody.content
      }

      if(reqBody.image != "") {
        thread.image = reqBody.image
      }

      const response = await this.ThreadRepository.save(thread);
      return {
        message: "success updated !",
        data: response
      }
    } catch (err) {
      throw new Error("Something wrong in server!");
    }
  }

  async delete(req: Request, res: Response) : Promise<Response> {
    try {
      const id = parseInt(req.params.id, 10);

      const thread = await this.ThreadRepository.findOne({
        where: {
          id: id,
        }
      })

      if(!thread) return res.status(404).json({ Error: "Thread ID not found"});
      
      await this.ThreadRepository.delete({
        id: id,
      }) 

      return res.status(200).json(thread);
    } catch (err) {
      return res.status(500).json({ Error: "Error while deleting thread" });
    }
  }
}