import { Box } from '@chakra-ui/react'
import { Threads } from '@/features/threads';
import { useParams } from 'react-router-dom';
import { Footer, MyProfile, Navbar } from "@/components";
import SuggestedFollow from '@/components/SuggestedFollow';
import Dummy from '@/mocks/thread.json';

export function DetailThread() {
  const { id } = useParams()
  const threadFilter = Dummy.filter(item => item.id === Number(id));
  
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
        {threadFilter.map((item) => {
          return (
            <Threads
              id={item.id}
              content={item.content}
              likes_count={item.likes_count}
              posted_at={item.posted_at}
              replies_count={item.replies_count}
              image={item.image}
              author_name={item.author_name}
              author_username={item.author_username}
              author_picture={item.author_picture}
              isLike={item.is_liked}
            />
          );
        })}
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
