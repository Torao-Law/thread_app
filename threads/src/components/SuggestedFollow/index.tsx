
import { Box, Card, CardBody, Text, Avatar, Button } from '@chakra-ui/react'

export function SuggestedFollow() {
  return (
    <Box display={"flex"} width={"300px"} height={"fit-content"} >
      <Card width={"100%"} bg={"transparent"} border="1px solid white" color={"white"}>
        <Text fontWeight={"bold"} marginLeft={"10px"} marginTop={"10px"}>
          Suggested for You
        </Text>
        <CardBody display={"flex"} gap={2}>
          <Avatar
            src="https://static1.personality-database.com/profile_images/4b05b8222e1f47d1b721ebe0800c9169.png"
            border={"2px solid black"}
          />
          <Box display={"flex"} flexDirection={"column"}>
            <Text fontWeight={"bold"}>Muhammad Jawahir</Text>
            <Text color={"grey"}>@em.jawahir</Text>
          </Box>
          <Button variant={"outline"} color={"white"}>Follow</Button>
        </CardBody>
      </Card>
    </Box>
  )
}
