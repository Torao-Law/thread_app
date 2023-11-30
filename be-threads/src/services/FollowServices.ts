import { Repository } from "typeorm"
import { Follow } from "../entities/Follow"
import { AppDataSource } from "../data-source"

export default new class FollowServices {
  private readonly FollowRepository: Repository<Follow> = AppDataSource.getRepository(Follow)

  async createFollowing(reqBody: any) : Promise<object | string> {
    try {
      const { userLogin, followingId } = reqBody;
      console.log(followingId)

      if(userLogin === followingId) return "can't follow yourself"

      const isFollowing = await this.FollowRepository.count({
        where: {
          followers: {
            id: userLogin
          },
          following: {
            id: followingId
          }
        }
      })
      
      if(isFollowing > 0) return "You've been following this account";

      const obj = this.FollowRepository.create({
        followers: userLogin,
        following: followingId
      })

      const following = await this.FollowRepository.save(obj)

      return {
        message: "Success following",
        data: following
      }
    } catch (err) {
      throw new err
    }
  }

  async find(userLogin: any, type: any): Promise<object | string> {
    try {
      if(type === "followers") {
        const listFollow = await this.FollowRepository.createQueryBuilder("follow")
          .select(["follow.id", "follower.id AS followerId", "follower.username", "follower.full_name"])
          .leftJoin("follow.followers", "follower")
          .where("follow.following = :userLogin", { userLogin })
          .getMany(); 

        if (!listFollow || listFollow.length === 0) {
          return {
            data: [],
            length: 0
          };
        }

        return {
          data: listFollow,
          length: listFollow.length
        };
      } else if(type === "followings") {
        const listFollow = await this.FollowRepository.createQueryBuilder("follow")
          .select(["follow.id", "following.id AS followerId", "following.username", "following.full_name"])
          .leftJoin("follow.following", "following")
          .where("follow.followers = :userLogin", { userLogin })
          .getMany(); 

        if (!listFollow || listFollow.length === 0) {
          return {
            data: [],
            length: 0
          };
        }

        const data = listFollow.map((item) => ({
          ...item,
          is_follow: true
        }))

        console.log(data)

        return {
          data,
          length: listFollow.length
        }
      }

      return `Please specify valid query "type" (followers / followings)`
    } catch (err) {
      throw new err;
    }
  }
}

