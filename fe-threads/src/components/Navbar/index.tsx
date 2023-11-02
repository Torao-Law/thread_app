import { Box, Text, Button, } from '@chakra-ui/react'
import { AiFillHome, AiOutlineSearch, AiOutlineHeart, AiOutlineUser } from 'react-icons/ai'

export function Navbar() {
  return (
    <Box width={"100%"} display={"flex"} flexDirection={"column"} gap={2}>
      <Text fontWeight={"bold"} fontSize={"50px"} color={"green"}>
        Circle
      </Text>

      <Button justifyContent={"flex-start"} variant='ghost' color={"white"}>
        <AiFillHome />
        <Text> Home</Text>
      </Button>
      
      <Button justifyContent={"flex-start"} variant='ghost' color={"white"}>
        <AiOutlineSearch />
        <Text> Search</Text>
      </Button>

      <Button justifyContent={"flex-start"} variant='ghost' color={"white"}>
        <AiOutlineHeart />
        <Text> Follow</Text>
      </Button>

      <Button justifyContent={"flex-start"} variant='ghost' color={"white"}>
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