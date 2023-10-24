
import { useState, useEffect } from "react";
import { Threads } from "@/features/threads"
import Dummy from "@/mocks/thread.json"
import { Navbar } from "@/components";
import { Footer } from "@/components/Footer";
import { MyProfile } from "@/components/MyProfile";
import SuggestedFollow from "@/components/SuggestedFollow";
import { Box } from "@chakra-ui/react";
import FormThread from "@/features/threads/component/FormThread";

export function Home() {
  const [data, setData] = useState<any>(Dummy)

  // console.log("Ini adalah testing")

  // useEffect(() => {
  //   setData(Dummy)
  // }, [])

  // useEffect(() => {
  //   console.log(data)
  // }, [data])

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
        <FormThread />
        { data.map((data, index) => {
          return (
            <div key={index}>
              <Threads 
                id={data.id}
                author_picture={data.author_picture}
                author_name={data.author_name}
                author_username={data.author_username}
                posted_at={data.posted_at}
                content={data.content}
                image={data.image}
                likes_count={data.likes_count}
                replies_count={data.replies_count}
                isLike={data.is_liked}
              />
            </div>
          )
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