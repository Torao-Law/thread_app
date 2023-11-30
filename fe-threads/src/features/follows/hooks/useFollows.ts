import React from 'react'
import { API } from "@/libs/api"

interface User {
  id: number;
  username: string;
  full_name: string;
  email: string;
  picture: string | null;
  description: string | null;
}

export default function useFollow() {
  const [listFollow, setListFollow] = React.useState<User[]>([])
  
  React.useEffect(() => {
    counting()
  }, [])


  async function getFollow(type: string) {
    try {
      const response = await API.get(`/follow?type=${type}`)
      
      console.log(response.data)
      setListFollow(response.data)
    } catch (err) {
      throw err
    }
  }

  async function counting() {
    try {

      const followers = await API.get(`/follow?type=followers`)
      const following = await API.get(`/follow?type=followings`)

      return {
        countFollowers: followers?.data?.length,
        countFollowings: following?.data?.length
      }
    } catch (err) {
      throw err
    }
  } 

  async function follow(id: number) {
    try {
      await API.post("/follow", {followingId: id})
    } catch (err) {
      throw err
    }
  }

  return { listFollow, follow, getFollow, counting }
}