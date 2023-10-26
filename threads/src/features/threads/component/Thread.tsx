import { Box, Image, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import  { IThreadCard } from "@/types/thread";

export type ThreadCard = {
  id: number | undefined;
  author_picture: string | undefined;
  author_name: string | undefined;
  author_username: string | undefined;
  posted_at: string | undefined;
  content: string | undefined;
  image: string | undefined;
  likes_count: number | undefined;
  replies_count: number | undefined; 
  users: User
}

type User = {
  id?: number,
  full_name?: string,
  username?: string,
  email?: string,
  profile_picture?: string
}

export function Threads(props: IThreadCard) {
  const navigate = useNavigate()

  return (
    <Box
      display={"flex"}
      width="500px"
      borderBottom={"1px solid white"}
      padding={"20px 0px"}
      bg={"transparent"} 
      color={"white"}
    >
      <Image 
        src={props.author_picture}
        width={"50px"}
        height={"50px"}
        objectFit={"cover"}
        borderRadius={"50%"}
        marginRight={"20px"}
      />
      <Box>
        <Box display={"flex"}>
          <Text style={{fontWeight: "bold"}}>{props.users?.full_name}</Text>
          <Text style={{color: "grey"}}>@{props.users?.username}</Text> 
          <Text style={{color: "grey"}}>{props.posted_at}</Text>
        </Box>
        <Box>
          <Text>{props.content}</Text>
          <Image 
            src={props.image}
            width={"400px"}
            height={"300px"}
            objectFit={"contain"}
            marginRight={"20px"}  
          />
        </Box>
        <button>{props.likes_count}</button>
        <button onClick={() => navigate(`/detail-thread/${props.id}`)}>{props.replies_count} replies</button>
      </Box>
    </Box>
  )
}
