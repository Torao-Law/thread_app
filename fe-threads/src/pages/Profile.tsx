import React from 'react'
import { Footer, Navbar, SuggestedFollow } from "@/components"
import { RootState } from "@/store/type/RootState"
import { Box, Text, Avatar, useDisclosure } from "@chakra-ui/react"
import { useSelector } from "react-redux"
import { useThreads } from "@/features/threads/Hooks/useThreads"
import { useParams } from "react-router-dom"
import { AiFillEdit } from "react-icons/ai";
import { ThreadCard } from '@/features/threads'
import EditProfileModal from '@/features/profile/components/EditProfileModal'
import { API } from '@/libs/api'

export default function Profile() {
  const auth = useSelector((state: RootState) => state.auth)
  const { id } = useParams()
  const { getThreadId } = useThreads();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [threadById, setThreadById] = React.useState([])
  const [countFollow, setCountFollow] = React.useState({
    followers: 0,
    followings: 0
  })
  
  React.useEffect(() => {
    async function fetch() {
      try {
        const thread = await getThreadId(id)
        const sumFollowers = await API.get(`/follows?type=followers`);
        const sumFollowings = await API.get(`/follows?type=followings`);
        
        setCountFollow({
          followers: sumFollowers.data.length,
          followings: sumFollowings.data.length
        })
        
        setThreadById(thread)
      } catch (err) {
        throw err
      }
    }

    fetch()
  }, [])
 
  console.log(threadById);
  

  return (
    <>
      <Box 
        display={"flex"}
        width={"300px"}
        height={"fit-content"}
        position={"fixed"}
        left={"30px"}
        paddingTop={"30px"}
        paddingRight={"30px"}
        borderRight={"1px solid #d3d3d3"}
        h={"100vh"}
      > 
        <Box 
          width={"100%"} 
          display={"flex"} 
          flexDirection={"column"} 
          gap={2}
        >
          <Navbar />
        </Box>
      </Box>
        
      <Box display={"flex"} justifyContent={"center"}>
        <Box
          display={"flex"}
          alignItems={"center"}
          flexDirection={"column"}
          paddingY={"20px"}
          width="660px"
          marginLeft={"-30px"}
          borderColor={"brand.grey"}
        >
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Avatar 
              size='xl' 
              name='profile-img' 
              boxShadow={ auth.picture ? auth.picture : "0 0px 8px 0 rgba(0, 0, 0, 0.2)" }
              src={ auth.picture ? auth.picture : 'https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?w=740&t=st=1701043356~exp=1701043956~hmac=2b339a836ef9e279252bef8898580a978b5f51db4ddb50f77fa984a8bb2f81e1' }
            />

            <Box 
              w={8}
              h={8}
              borderRadius={'full'}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              position={"absolute"}
              top={6}
              left={690}
              bg={'gray'}
              textColor={'white'}
              cursor={"pointer"}
              onClick={() => onOpen()}
            >
              <AiFillEdit />
            </Box>

            <EditProfileModal isOpen={isOpen} onClose={onClose}/>
            <Text textAlign={"center"} fontWeight={"bold"} fontSize={"xl"} mt={2}>{auth?.full_name}</Text>
          </Box>

          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={10}
            mt={5}
          >
            <Box
              display={'flex'}
              gap={2}
            >
              <Text
                fontWeight={"bold"}
              >
                { !threadById ? "0" : threadById.length }
              </Text>
              <Text>
                Posting
              </Text>
            </Box>

            <Box
              display={'flex'}
              gap={2}
            >
              <Text
                fontWeight={"bold"}
              >
                { countFollow.followers }
              </Text>
              <Text>
                Followers
              </Text>
            </Box>

            <Box
              display={'flex'}
              gap={2}
            >
              <Text
                fontWeight={"bold"}
              >
                { countFollow.followings }
              </Text>
              <Text>
                Following
              </Text>
            </Box>
          </Box>

          <Box>
            { threadById?.map((item: any) => (
              <Box key={item.id}>
                <ThreadCard
                  id={item.id}
                  users={item?.users}
                  content={item.content}
                  likes_count={item.likes_count}
                  posted_at={item.posted_at}
                  replies_count={item.replies_count}
                  image={item.image}
                  is_liked={item.is_liked}
                />
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      <Box
        display={"flex"}
        flexDirection={"column"}
        gap={5}
        position={"fixed"}
        right={"30px"}
        top={"0px"}
        paddingTop={"30px"}
        paddingLeft={"30px"}
        borderLeft={"1px solid #d3d3d3"}
        h={"100vh"}
      >
        <Box>
          <SuggestedFollow />
        </Box>

        <Box>
          <Footer />
        </Box>
      </Box>
    </>
  )
}

