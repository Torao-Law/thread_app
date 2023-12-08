import { Box, Text, Spinner } from "@chakra-ui/react"
import { ReactNode, useState, useEffect } from "react"
import { Footer, MyProfile, Navbar, SuggestedFollow } from "@/components"

export default function Main({children}: {children: ReactNode}) {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  useEffect(() => {
    const delay = setTimeout(() => {
      setIsLoading(false);
    }, 500); 
    return () => clearTimeout(delay);
  }, []);

  return (
    isLoading ?  
      (
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          w={'full'}
          position={"absolute"}
        >
          <Spinner color='green.500' marginTop={"150px"} />
          <Text mt={2}>Please wait...</Text>
        </Box>
      ) : (
        <>
          <Box height={"100vh"} 
            
            overflowY={'scroll'}>
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

            {children}

            <Box
              display={"flex"}
              flexDirection={"column"}
              gap={5}
              position={"fixed"}
              right={"30px"}
              top={"0px"}
              paddingTop={"10px"}
              paddingLeft={"30px"}
              borderLeft={"1px solid #d3d3d3"}
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
          </Box>
        </>
      )
    
  )
}