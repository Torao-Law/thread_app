import { API } from "@/libs/api"

export default function useLikes() {
  async function handleLike(id: number | undefined) {
    await API.post("/like", { thread_id: id})
  }

  return {
    handleLike
  }
}
