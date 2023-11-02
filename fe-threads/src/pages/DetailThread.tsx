import { Box, Input, FormControl, Image, Text, Button } from '@chakra-ui/react'
import { ThreadCard } from '@/features/threads';
import { useState, useEffect, ChangeEvent } from 'react';
import { API } from '@/libs/api';
import { useParams } from "react-router-dom";
import { IThreadCard } from '@/types/Thread';
import { ReplyPost } from '@/types/Reply';
import { useQuery } from '@tanstack/react-query';

export default function DetailThread() {
  const { id } = useParams()
  const [data, setData] = useState<IThreadCard>()
  const [reply, setReply] = useState<ReplyPost>({
    content: "",
    thread_id: parseInt(id as string)
  })

  useEffect(() => {
    getOneThread()
  }, [])

  async function getOneThread() {
    try {
      const response = await API.get(`/thread/${id}`)
      
      setData(response.data)
    } catch (err) {
      console.log(err);
    }
  }
  

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setReply({
      ...reply,
      [event.target.name]: event.target.value
    })
  }

  async function handlePost(event: React.FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault();
      
      await API.post("/reply", reply)
      refetch()
    } catch (err) {
      console.log(err);
    }
  }

  const { data: getReply, refetch } = useQuery({
    queryKey: ["replies"],
    queryFn: async () => await API.get(`/replies?thread_id=${id}`)
     .then(res => res.data)
  })

  console.log(data);
  

  return (
    <Box display={"flex"} justifyContent={"center"}>
      <Box
        display={"flex"}
        alignItems={"center"}
        flexDirection={"column"}
        padding={"20px"}
        width="600px"
        borderRight={"1px solid"}
        borderLeft={"1px solid"}
        borderColor={"brand.grey"}
      >
        <ThreadCard
          id={data?.id}
          users={data?.users}
          content={data?.content}
          likes_count={data?.likes_count}
          posted_at={data?.posted_at}
          replies_count={data?.replies_count}
          image={data?.image}
          is_liked={data?.is_liked}
        />
        <Box marginTop={"20px"}>
            <form 
              onSubmit={handlePost} 
              encType="multipart/form-data"
            >
              <FormControl display={"flex"} flexDirection={"column"} gap={2} color={"white"}>
                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  gap={2}
                >
                  <Input
                    placeholder="What is happening?!"
                    name="content"
                    onChange={handleChange}
                  />
                  <Button
                    type="submit"
                    backgroundColor={"brand.green"}
                    color={"white"}
                    colorScheme="green"
                    // value={"Post"}
                    fontSize={"12px"}
                    width={"70px"}
                  >Post</Button>
                </Box>
              </FormControl>
            </form>

            { getReply?.map((data: any, index: any) => (
              <Box 
                key={index}
                display={"flex"}
                width="500px"
                borderBottom={"1px solid white"}
                padding={"20px 0px"}
                bg={"transparent"} 
                color={"white"}
              >
                <Image
                  src={data.users?.picture ? data.users?.picture : "https://i.pinimg.com/564x/bc/c6/e1/bcc6e12a3bef4190e0f8f1a14885c321.jpg"}
                  width={"50px"}
                  height={"50px"}
                  objectFit={"cover"}
                  borderRadius={"50%"}
                  marginRight={"20px"}
                />

                <Box>
                  <Box display={"flex"}>
                    <Text color={"grey"}>{data.users?.full_name}</Text>
                    <Text ms={2} color="grey">@{data.users?.username}</Text>
                  </Box>
                  <Text>{data.content}</Text>
                </Box>                
              </Box>
            ))}
          </Box>
      </Box>
    </Box>
  )
}
