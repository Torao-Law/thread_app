import { Box, Text, Avatar, Button } from '@chakra-ui/react'
import useFollow from '@/features/follows/hooks/useFollows'

export function Follows(props: any) {
  const { follow } = useFollow()
  return (
    <Box 
      width={"100%"} 
      padding={"20px"}
    >
      { props.listFollow?.data?.map((item: any) => {
        const dynamicProperty = item.followers ? 'followers' : 'following';

        console.log(item)
        return (
        <Box 
          display={"flex"} 
          gap={2}
          p={0}
          my={4}
          alignItems={"center"} 
          key={item.id}
        >
          <Avatar
            src="https://static1.personality-database.com/profile_images/4b05b8222e1f47d1b721ebe0800c9169.png"
            border={"2px solid black"}
            size={"md"}
          />
          <Box 
            display={"flex"} 
            flexDirection={"column"} 
            flex={1} 
            overflow={"hidden"}
          >
            <Text 
              fontSize={"md"} 
              fontWeight={"bold"}
              overflow={"hidden"}
              whiteSpace={"nowrap"} 
              textOverflow={"ellipsis"}
            >
              {item?.[dynamicProperty]?.full_name}
            </Text>
            <Text fontSize={"xs"} color={"grey"}>@{item?.[dynamicProperty]?.username}</Text>
          </Box>
          <Button 
            size={"xs"} 
            variant={"outline"}
            borderRadius={'full'}
            borderColor={"gray"}
            onClick={() => follow(item?.id)}
          >
            {item?.is_follow ? "Following" : "Follow"}
          </Button>
        </Box>
      )})}    
    </Box>
  )
}
