import * as bcrypt from "bcrypt"
import * as jwt from "jsonwebtoken"
import { Repository } from "typeorm"
import { User } from "../entities/user"
import { AppDataSource } from "../data-source"
import { Request, Response } from "express"
import { registerSchema, loginSchema } from "../utils/validator/Auth"

export default new class AuthServices {
  private readonly AuthRepository: Repository<User> = AppDataSource.getRepository(User)

  async register(req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body

      const { error, value } = registerSchema.validate(data)

      if (error) return res.status(400).json({ Error: error })
      
      const isCheckEmail = await this.AuthRepository.count({
        where: {
          email: value.email
        }
      })

      if (isCheckEmail > 0) return res.status(400).json({ Error: "Email already exists" })

      const hashedPassword = await bcrypt.hash(value.password, 10)

      const user = this.AuthRepository.create({
        full_name: value.full_name,
        username: value.username,
        email: value.email,
        password: hashedPassword
      })

      const createdUser = await this.AuthRepository.save(user)
      return res.status(201).json(createdUser)
    } catch (err) {
      return res.status(500).json({ Error: "Error while registering" })
    }
  }

  async login(req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body

      const { error, value } = loginSchema.validate(data)

      const isCheckEmail = await this.AuthRepository.findOne({
        where: {
          email: value.email
        },
        select: ["id", "full_name", "email", "username", "password"]
      })

      if (!isCheckEmail) return res.status(404).json({ Error: "Email not found" })

      const isCheckPassword = await bcrypt.compare(value.password, isCheckEmail.password)
      // isCheckPassword = false => !isCheckPassword = true
      // isCheckPassword = true => !isCheckPassword = false

      if (!isCheckPassword) return res.status(400).json({ Error: "Incorrect password" })

      const user = this.AuthRepository.create({
        id: isCheckEmail.id,
        full_name: isCheckEmail.full_name,
        email: isCheckEmail.email,
        username: isCheckEmail.username
      })

      const token = await jwt.sign({ user }, "pinjam_seratus", { expiresIn: "1h" })

      return res.status(200).json({
        user,
        token
      })
    } catch (err) {
      return res.status(500).json({ Error: "Error while logging in" })
    }
  }

  async check(req: Request, res: Response): Promise<Response> {
    try {
      const logginSession = res.locals.logginSession

      const user = await this.AuthRepository.findOne({
        where: {
          id: logginSession.user.id
        }
      })

      return res.status(200).json({
        user,
        message: "You are logged in"
      })
    } catch (err) {
      return res.status(500).json({ Error: "Error while checking" })
    }
  }
}