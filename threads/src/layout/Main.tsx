import { Footer, MyProfile, Navbar, SuggestedFollow } from "@/components"
import { Box } from "@chakra-ui/react"
import { ReactNode } from "react"

export default function Main({children}: {children: ReactNode}) {
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
        borderRight={"1px solid gray"}
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

      {children}

      <Box
        display={"flex"}
        flexDirection={"column"}
        gap={5}
        position={"fixed"}
        right={"30px"}
        top={"0px"}
        paddingTop={"30px"}
        paddingLeft={"30px"}
        borderLeft={"1px solid gray"}
        h={"100vh"}
      >
        <Box>
          <MyProfile />
        </Box>

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