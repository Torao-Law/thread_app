import { Box, Card, Text, Image, Avatar, CardBody } from '@chakra-ui/react'

export function MyProfile() {
  return (
    <>
      <Box display={"flex"} width={"300px"} height={"fit-content"} >
        <Card width={"100%"} bg={"transparent"} border="1px solid white" color={"white"}>
          <Text fontWeight={"bold"} marginLeft={"10px"} marginTop={"10px"}>
            My Profile
          </Text>
          <Box>
            <Image
              src="https://images.pexels.com/photos/6985001/pexels-photo-6985001.jpeg?cs=srgb&dl=pexels-codioful-%28formerly-gradienta%29-6985001.jpg&fm=jpg"
              objectFit={"cover"}
              padding={"10px"}
              borderRadius={"20px"}
              height={"100px"}
              width={"100%"}
            />
            <Avatar
              src="https://static1.personality-database.com/profile_images/4b05b8222e1f47d1b721ebe0800c9169.png"
              position={"absolute"}
              border={"2px solid black"}
              top={70}
              left={5}
              width={"75px"}
              height={"75px"}
            />
          </Box>
          <CardBody>
            <Text fontWeight={"bold"}>Jhon Doe</Text>
            <Text>@jhondoe</Text>
            <Text>Life's too short, be badass</Text>
            <Box display={"flex"} gap={3}>
              <Box display={"flex"} gap={2}>
                <Text fontWeight={"bold"}>291</Text>
                <Text>Following</Text>
              </Box>
              <Box display={"flex"} gap={2}>
                <Text fontWeight={"bold"}>23</Text>
                <Text>Followers</Text>
              </Box>
            </Box>
          </CardBody>
        </Card>
      </Box>
    </>
  )
}
