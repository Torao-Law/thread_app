import { Box, Card, CardBody, Text, Avatar, Button } from '@chakra-ui/react'
import useSuggestFollow from '../hooks/useSuggestFollow'
import useFollow from '@/features/follows/hooks/useFollows'
import React from 'react'

export function SuggestedFollow() {
  const { suggestFollow } = useSuggestFollow()
  const { handleFollow } = useFollow() 
  
  return (
    <Box display={"flex"} width={"300px"} height={"fit-content"} >
        <Card 
          width={"100%"} 
          bg={"transparent"} 
          boxShadow={"0 0 6px rgba(0, 0, 0, 0.5)"} 
          padding={5}
          >
          <Text fontWeight={"bold"} mb={1}>Suggested for You</Text>
          { suggestFollow?.map((item: any) => (
            <CardBody 
              display={"flex"} 
              gap={2}
              p={0}
              my={1}
              alignItems={"center"} 
              key={item.id}
              
            >
              <Avatar
                src={item.image ? item.image :"https://static1.personality-database.com/profile_images/4b05b8222e1f47d1b721ebe0800c9169.png"}
                border={"2px solid black"}
                size={"sm"}
              />
              <Box 
                display={"flex"} 
                flexDirection={"column"} 
                flex={1} 
                overflow={"hidden"}
              >
                <Text 
                  fontSize={"xs"} 
                  fontWeight={"bold"}
                  overflow={"hidden"}
                  whiteSpace={"nowrap"} 
                  textOverflow={"ellipsis"}
                >
                  {item?.full_name}
                </Text>
                <Text fontSize={"xs"} color={"grey"}>@{item?.username}</Text>
              </Box>
              <Button 
                size={"xs"} 
                variant={"solid"}
                borderRadius={'full'}
                colorScheme='green'
                bg={'green'}
                onClick={() => handleFollow(item?.id, item.user_id, item.is_followed)}
              >
                Follow
              </Button>
            </CardBody>
          ))}    
        </Card>
    </Box>
  )
}
