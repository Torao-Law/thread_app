import { Request, Response } from "express";
import UserServices from "../services/UserServices";
import { updateUserSchema } from "../utils/validator/User";
import CloudinaryConfig from "../libs/cloudinary";

type User = {
  id: number,
  username: string,
  email: string,
  password: string,
  picture: string | null,
  description: string | null
}

export default new class UserControllers {
  async find(req: Request, res: Response) {
    try {
      const userLogin = res.locals.loginSession
      const response = await UserServices.find(userLogin.user.id);
      
      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json({ error: "Something went wrong on the server!" });
    }
  }

  async findOne(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);

      const response = await UserServices.findOne(id);
      if(response === null) return res.status(400).json({ message: `User ID: ${id} not found`})
      
      return res.status(200).json(response);
    } catch (err) {
      return res
      .status(500)
      .json({ error: "Something went wrong on the server!" });
    }
  }
  
  async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id)
      const { full_name, username, email, password, description } = req.body;
      let image = res.locals.filename || null;   
      
      if(isNaN(id) || id < 0) return res.status(400).json({ message: "Invalid ID provided!" });
      
      const user: User | any = await UserServices.findOne(id);
      if(user === null) return res.status(400).json({ message: `User ID: ${id} not found`})

      const cloudinaryResponse = await CloudinaryConfig.destination(image)
      console.log(cloudinaryResponse)
      
      const { error, value } = updateUserSchema.validate({username, full_name, email, password, cloudinaryResponse, description})
      if(error) return res.status(400).json({ message: "Data not relevant please make sure !"})

      const fieldsToUpdate = ['username', 'full_name', 'email', 'password', 'image', 'description'];
      fieldsToUpdate.forEach(field => {
        if (value[field] !== undefined && value[field] !== null && value[field] !== "") {
          user[field] = value[field];
        }
      });

      const data = await UserServices.update(user)
      console.log(data)
      const response: User | any = await UserServices.findOne(id);

      return res.status(201).json(response)
    } catch (err) {
      return res.status(500).json({ err: "Something went wrong on the server!" })
    }
  }
  
  // create(req: Request, res: Response) {
  //   ThreadQueue.create(req, res)
  // }
}

