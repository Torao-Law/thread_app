import { API } from "@/libs/api"
// import { useThreads } from "./useThreads"

export default function useLikes() {
  // const { getThreads } = useThreads()

  // console.log(getThreads)

  async function handleLike(id?: number ) {
    // try {

    // }
    await API.post("/like", { thread_id: id})
  }



  return {
    handleLike,
    //  getLike, refetch
  }
}
