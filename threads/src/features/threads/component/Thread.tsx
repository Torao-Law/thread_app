import { Box, Image, Text, Button } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"

export type ThreadCard = {
  id?: number,
  user: User,
  posted_at?: string;
  content?: string;
  image?: string;
  likes_count?: number;
  replies_count?: number;
  is_liked: boolean;
}

interface User {
  id?: number,
  full_name?: string,
  username?: string,
  email?: string,
  profile_picture?: string,
}

export function ThreadCard(props: ThreadCard) {
  log
  const navigate: any = useNavigate()

  return (
    <>
      <Box
        display={"flex"}
        width="500px"
        borderBottom={"1px solid white"}
        padding={"20px 0px"}
        bg={"transparent"} 
        color={"white"}
      >
        <Image
          src={props.user?.profile_picture ? props.user?.profile_picture : "https://i.pinimg.com/564x/bc/c6/e1/bcc6e12a3bef4190e0f8f1a14885c321.jpg"}
          width={"50px"}
          height={"50px"}
          objectFit={"cover"}
          borderRadius={"50%"}
          marginRight={"20px"}
        />
        <Box>
          <Box display={"flex"}>
            <Text>{props.user?.full_name}</Text>
            <Text ms={2} color="grey">@{props.user?.username}</Text>
            <Text ms={2} color="grey">{props.posted_at}</Text>
          </Box>
          <Text>{props.content}</Text>
          <Image
            mt={3}
            src={props.image}
            width={"400px"}
            height={"300px"}
            objectFit={"contain"}
            marginRight={"20px"}
          />
          <Box display={"flex"} gap={2} marginTop={"10px"}>
            <Button backgroundColor={props?.is_liked ? "red" : "grey"}>
              {props.likes_count}
            </Button>
            <Button onClick={() => navigate(`/detail-posted/${props.id}`)}>{props.replies_count} Replies</Button>
          </Box>
        </Box>
      </Box>
    </>
  )
}

