import { RootState } from '@/store/type/RootState'
import { Box, Avatar, Text, Button } from '@chakra-ui/react'
import { useSelector } from 'react-redux'

export default function CardUser(props: any) {
  const auth = useSelector((root: RootState) => root.auth)
  // console.log(auth);
  
  // console.info(props)
  return (
    <Box 
      display={"flex"} 
      gap={2}
      p={0}
      mt={2}
      alignItems={"center"} 
    >
      <Avatar
        src={ props?.picture ? props?.picture : "https://static1.personality-database.com/profile_images/4b05b8222e1f47d1b721ebe0800c9169.png"}
        border={"2px solid black"}
      />
      <Box 
        display={"flex"} 
        flexDirection={"column"} 
        flex={1} 
        overflow={"hidden"}
      >
        <Text 
          fontSize={"sm"} 
          fontWeight={"bold"}
          overflow={"hidden"}
          whiteSpace={"nowrap"} 
          textOverflow={"ellipsis"}
        >
          {props?.full_name}
        </Text>
        <Text fontSize={"xs"} color={"grey"}>@{props?.username}</Text>
        { props?.description && (<Text fontSize={"xs"} color={"grey"}>{props?.description}</Text>)}
      </Box>
      <Button 
        size={"sm"} 
        variant= {props.isFollowing ? 'outline' : 'solid' }
        colorScheme='green'
        borderRadius={'full'}
      >
        {props.isFollowing ? "Unfollow" : "Follow"}
      </Button>
    </Box>
  )
}
