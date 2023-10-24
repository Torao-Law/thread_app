import { Repository } from "typeorm"
import { Thread } from "../entities/thread"
import { AppDataSource } from "../data-source"
import { Request, Response } from "express"
import { createThreadSchema, updateThreadSchema } from "../utils/validator/Thread"

export default new class ThreadServices {
  private readonly ThreadRepository: Repository<Thread> = AppDataSource.getRepository(Thread)

  async find(req: Request, res: Response) : Promise<Response> {
    try {
      const threads = await this.ThreadRepository.find({
        relations: ["users"]
      })

      let newResponse = []
      threads.forEach((data) => {0
        newResponse.push({
          ...data,
          likes_count: Math.floor(Math.random() * 10),
          replies_count: Math.floor(Math.random() * 10)
        })
      })

      return res.status(200).json(newResponse)
    } catch (err) {
      return res.status(500).json({ Error: "Error while getting threads" })
    }
  }

  async findOne(req: Request, res: Response) : Promise<Response> {
    try {
      const id = parseInt(req.params.id, 10)
      const thread = await this.ThreadRepository.findOne({
        where: {
          id: id
        }
      })

      return res.status(200).json(thread)
    } catch (err) {
      return res.status(500).json({ Error: "Error while getting a thread" })
    }
  }

  async create(req: Request, res: Response) : Promise<Response> {
    try {
      const data = req.body

      const { error } = createThreadSchema.validate(data)
      if(error) return res.status(400).json({ Error: error })

      const thread = this.ThreadRepository.create({
        content: data.content,
        image: data.image,
        users: data.user
      })      
      
      const createdThread = await this.ThreadRepository.save(thread)
      return res.status(201).json(createdThread)
    } catch (err) {
      return res.status(500).json({ Error: "Error while creating thread" })
    }
  }

  async update(req: Request, res: Response) : Promise<Response> {
    try {
      const id = parseInt(req.params.id, 10)
      const thread = await this.ThreadRepository.findOne({
        where: {
          id: id
        }
      })

      if(!thread) return res.status(404).json({ Error: "Thread ID not found"})
      
      const data = req.body

      const { error } = updateThreadSchema.validate(data)
      if(error) return res.status(400).json({ Error: error })

      if(data.content != "") {
        thread.content = data.content
      }

      if(data.image != "") {
        thread.image = data.image 
      }

      await this.ThreadRepository.save(thread)
      return res.status(200).json(thread)
    } catch (err) {
      return res.status(500).json({ Error: "Error while updating thread" })
    }
  }

  async delete(req: Request, res: Response) : Promise<Response> {
    try {
      const id = parseInt(req.params.id, 10)

      const thread = await this.ThreadRepository.findOne({
        where: {
          id: id
        }
      })

      if(!thread) return res.status(404).json({ Error: "Thread ID not found"})
      
      await this.ThreadRepository.delete({
        id: id
      }) // DELETE FROM threads WHERE id = id

      return res.status(200).json(thread)
    } catch (err) {
      return res.status(500).json({ Error: "Error while deleting thread" })
    }
  }
}