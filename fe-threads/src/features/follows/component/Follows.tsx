import { Box, Text, Button, Image } from '@chakra-ui/react'
import { IFollow } from '@/types/Follow'
import useFollows from '../hooks/useFollows'

export function Follows(props: IFollow) {
  const { handleFollow } = useFollows()
  
  
  return (
    <>
      <Box display={"flex"} width="100%" padding={"20px 0px"}>
        <Image
          src={props.picture ?? "https://static1.personality-database.com/profile_images/4b05b8222e1f47d1b721ebe0800c9169.png"}
          width={"50px"}
          height={"50px"}
          objectFit={"cover"}
          borderRadius={"50%"}
          marginRight={"20px"}
          alt="user_profile_image"
        />

        <Box display={"flex"} width={"100%"}>
          <Box display={"flex"} flexDirection={"column"} gap={2} flex={2}>
            <Box display={"flex"}>
              <Text>{props.full_name}</Text>
            </Box>
            <Text color="brand.grey">@{props.username}</Text>
            <Text>{props.description}</Text>
          </Box>
          <Box flex={1} display="flex" justifyContent={"flex-end"}>
            <Button
              variant= {props.is_followed ? 'outline' : 'solid' }
              colorScheme='green'
              borderRadius={'full'}
              onClick={() => handleFollow(props.id, props.user_id, props.is_followed)}
            >
              {props.is_followed ? "Unfollow" : "Follow"}
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  )
}