import { Repository } from "typeorm"
import { User } from "../entities/User"
import { AppDataSource } from "../data-source"

export default new class UserSevices {
  private readonly UserRepository: Repository<User> = AppDataSource.getRepository(User)

  async find(id: number) : Promise<any>  {
    try {
      const arr = await this.UserRepository.find()

      const users = this.removeIdLogin(arr, id)
      return users
    } catch (err) {
      throw new Error("Something wrong in find service users !");
    }
  }

  async findOne(id: number) : Promise<object | string> {
    try {
      const arr = await this.UserRepository.findOne({ where: { id }})

      return arr
    } catch (err) {
      throw new Error("Something wrong in find service users !");
    }
  }

  async update(data: any) : Promise<object | string> {
    try {
      const arr = await this.UserRepository.save(data)
      return arr
    } catch (err) {
      throw new Error("Something wrong in find service users !");
    }
  }

  private removeIdLogin(dataUser: any, id: number) : any {
    const res = dataUser.filter(obj => obj.id !== id)

    return res
  }
}