import { Box, Text, Button, } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { AiFillHome, AiOutlineSearch, AiOutlineHeart, AiOutlineUser } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/type/RootState'

export function Navbar() {
  const navigate = useNavigate()
  const auth = useSelector((root: RootState) => root.auth)

  return (
    <Box width={"100%"} display={"flex"} flexDirection={"column"} gap={2}>
      <Text fontWeight={"bold"} fontSize={"40px"} color={"green"}>
        Circle
      </Text>

      <Button 
        justifyContent={"flex-start"} 
        variant='ghost' 
        gap={2} 
        fontSize={"lg"}
        onClick={() => navigate("/")}
      >
        <AiFillHome />
        <Text> Home</Text>
      </Button>
      
      <Button 
        justifyContent={"flex-start"} 
        variant='ghost' 
        gap={2} 
        fontSize={"lg"}
        onClick={() => navigate("/search")}
      >
        <AiOutlineSearch />
        <Text> Search</Text>
      </Button>

      <Button 
        justifyContent={"flex-start"} 
        variant='ghost' 
        gap={2} 
        fontSize={"lg"}
        onClick={() => navigate(`/follow`)}
      >
        <AiOutlineHeart />
        <Text> Follow</Text>
      </Button>

      <Button 
        justifyContent={"flex-start"} 
        variant='ghost' 
        gap={2} 
        fontSize={"lg"}
        onClick={() => navigate(`/profile/${auth.id}`)}
      >
        <AiOutlineUser />
        <Text> Profile</Text>
      </Button>

      <Button
        bgColor={"green"}
        borderRadius={"30px"}
        color={"white"}
        marginTop={"30px"}
        colorScheme="green"
      >
        Create Post
      </Button>
    </Box>
  )
}