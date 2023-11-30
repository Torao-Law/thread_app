import { Request, Response } from "express";
import FollowServices from "../services/FollowServices";
import { createFollowingSchema } from "../utils/validator/Follow";

export default new class FollowControllers {
  async followed(req: Request, res: Response) {
    try {
      const userLogin = res.locals.loginSession
      const data = {
        userLogin: userLogin.user.id,
        followingId: req.body.followingId
      }

      const { error } = createFollowingSchema.validate(data)
      if(error) return res.status(400).json({ Message: "Error entering the userid to be followed / session id does not match" })

      const followed = await FollowServices.createFollowing(data)

      return res.status(200).json(followed)
    } catch (err) {
      return res.status(500).json({ Message: "Something error while create followed"})
    }
  }

  async find(req: Request, res: Response) {
    try {
      const userLogin = res.locals.loginSession;
      const { type } = req.query

      console.log(type)
      const data = await FollowServices.find(userLogin.user.id, type)

      return res.status(200).json(data)
    } catch (err) {
      return res.status(500).json({ Message: "Something error while finding followed by user login"})
    }
  }
}