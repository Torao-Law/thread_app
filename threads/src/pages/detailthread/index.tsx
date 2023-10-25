import { useState, useEffect } from "react";
import { Box } from '@chakra-ui/react'
import { Threads, ThreadCard } from '@/features/threads';
import { useParams } from 'react-router-dom';
import { Footer, MyProfile, Navbar, SuggestedFollow } from "@/components";
import { API } from "@/libs/api";

export function DetailThread() {
  const { id } = useParams()
  const [thread, setSetTread] = useState<ThreadCard>()
  
  async function getThread() {
    try {
      const response = await API.get(`/thread/${id}`);
      setSetTread(response?.data);
    } catch (err) {
      throw err
    }
  }
  getThread()

  

  useEffect(() => {
    getThread()
  }, [])
  
  return (
    <Box display={"flex"} justifyContent={"center"}>
      <Box 
        display={"flex"}
        width={"300px"}
        position={"fixed"}
        left={"30px"}
        top={"30px"}
        height={"fit-content"}
      >
        <Navbar />
      </Box>

      <Box
        display={"flex"}
        alignItems={"center"}
        flexDirection={"column"}
        padding={"10px"}
      >
        {/* <Threads
          content={thread.content}
          likes_count={thread.likes_count}
          posted_at={thread.posted_at}
          replies_count={thread.replies_count}
          image={thread.image}
          author_name={thread?.author_name}
          author_username={thread?.author_username}
          author_picture={thread?.author_picture}
        /> */}
      </Box>

      <Box
        display={"flex"}
        flexDirection={"column"}
        gap={5}
        position={"fixed"}
        right={"30px"}
        top={"30px"}
      >
        <MyProfile />
        <SuggestedFollow />
        <Footer />
      </Box>
    </Box>
  )
}
