import { Box, Image, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

type ThreadCard = {
  id: number;
  author_picture: string;
  author_name: string;
  author_username: string;
  posted_at: string;
  content: string;
  image: string;
  likes_count: number;
  replies_count: number;
  isLike: boolean;
}

export function Threads(props: ThreadCard) {
  const { 
    id, 
    author_picture, 
    author_name, 
    author_username,
    posted_at,
    content,
    image,
    likes_count,
    replies_count,
    isLike
  } = props

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
        src={author_picture}
        width={"50px"}
        height={"50px"}
        objectFit={"cover"}
        borderRadius={"50%"}
        marginRight={"20px"}
      />
      <Box>
        <Box display={"flex"}>
          <Text style={{fontWeight: "bold"}}>{author_name}</Text>
          <Text style={{color: "grey"}}>@{author_username}</Text> 
          <Text style={{color: "grey"}}>{posted_at}</Text>
        </Box>
        <Box>
          { isLike && (<Text>Pinjem dulu seratus</Text>) }
          <Text>{content}</Text>
          <Image 
            src={image}
            width={"400px"}
            height={"300px"}
            objectFit={"contain"}
            marginRight={"20px"}  
          />
          { isLike ? (<Text>Pinjem dulu seratus</Text>) : (<Text>Sorry gabisa halo dek</Text>) }
        </Box>
        <button>{likes_count}</button>
        <button onClick={() => navigate(`/detail-thread/${id}`)}>{replies_count} replies</button>
      </Box>
    </Box>
  )
}
