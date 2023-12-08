import { Box,  FormControl, FormLabel, Input, Button } from '@chakra-ui/react';
import { ThreadCard } from '@/features/threads';
import { useThreads } from '@/features/threads/Hooks/useThreads';
import { BiSolidImageAdd } from "react-icons/bi"
import { useEffect } from "react"

export default function Home() {
  const { getThreads, form, handlePost, handleChange, fileInputRef, handleButtonClick, isLoading, refetch } = useThreads()

  useEffect(() => {
    refetch()
  }, [isLoading])

  return (
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
        <Box width={"100%"} paddingX={5}>
          <FormControl 
            display={"flex"} 
            flexDirection={"column"} 
            gap={2} 
            bg={"transparent"}  
            width={"100%"}
            >
              <FormLabel>Content</FormLabel>
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Input 
                  placeholder="Apa yang sedang kamu pikirkan..."
                  height={"100px"}
                  name="content" 
                  onChange={handleChange} 
                  value={form.content}
                  sx={{
                    "&::placeholder": {
                      textAlign: "left",
                      verticalAlign: "top",
                      lineHeight: "1.5",
                      color: "gray.500",
                      fontSize: "sm",
                    },
                  }}
                />
                <Button
                  variant={"ghost"}
                  color={"brand.green"}
                  onClick={handleButtonClick}
                >
                  <BiSolidImageAdd
                    style={{
                      height: "50px",
                      width: "50px",
                    }}
                  />
                </Button>
                <Input
                  type="file"
                  name="image"
                  onChange={handleChange}
                  style={{ display: "none" }}
                  ref={fileInputRef}
                />

                <Box display={"flex"} justifyContent={"end"}>
                  <Button 
                    backgroundColor={"green"} 
                    color={"white"} 
                    colorScheme="green" 
                    onClick={() => handlePost.mutate()}
                  >
                    Submit
                  </Button>
                </Box>
              </Box>
          </FormControl>
        </Box>

        <Box>
        { getThreads?.map((item) => {      
            return (
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
            );
          })}
        </Box>
      </Box>
    </Box>
  )
}