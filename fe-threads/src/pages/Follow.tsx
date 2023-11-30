import React from 'react'
import { Follows } from '@/features/follows'
import { Box, Text } from '@chakra-ui/react'
import useFollow from '@/features/follows/hooks/useFollows'

export default function Follow() {
  const [isActiveFollowers, setIsActiveFollowers] = React.useState<boolean>(true)
  const [isActiveFollowing, setIsActiveFollowing] = React.useState<boolean>(!isActiveFollowers)
  const { listFollow, getFollow } = useFollow()

  React.useEffect(() => {
    getFollow("followers")
  }, [])

  const handleActiveFollowers = () => {
    getFollow("followers")
    setIsActiveFollowing(!isActiveFollowing)
    setIsActiveFollowers(!isActiveFollowers)
  }

  const handleActiveFollowing = () => {
    getFollow("followings")
    setIsActiveFollowing(!isActiveFollowing)
    setIsActiveFollowers(!isActiveFollowers)
  }

  return (
    <Box display={"flex"} justifyContent={"center"}>
      <Box
        display={"flex"}
        // alignItems={"center"}
        flexDirection={"column"}
        paddingY={"20px"}
        width="660px"
        marginLeft={"-30px"}
        borderColor={"brand.grey"}
      >
        <Text
          fontSize={"xl"}
          fontWeight={"bold"}
          mb={4}
        >
          Follow
        </Text>

        <Box display={"flex"} textAlign={"center"}>
          <Box onClick={handleActiveFollowers} w={"full"} cursor={"pointer"}>
            <Text 
              w={"full"} 
              fontSize={"md"}
              pb={2}
              borderBottom={isActiveFollowers ? "1px solid red" : 'none'}
            >
              Followers
            </Text>
          </Box>

          <Box onClick={handleActiveFollowing} w={"full"} cursor={"pointer"}>
            <Text 
              w={"full"} 
              fontSize={"md"}
              pb={2}
              borderBottom={isActiveFollowing ? "1px solid red" : 'none'}
            >
              Following
            </Text>
          </Box>
        </Box>

        <Box>
          <Follows listFollow={listFollow}/>
        </Box>
      </Box>
    </Box>
  )
}
