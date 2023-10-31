import { FormControl, FormLabel, Input, Box, Button } from "@chakra-ui/react"
import { BiSolidImageAdd } from "react-icons/bi"
import { useThreads } from "@/features/threads/Hooks/useThreads"

export default function FormThread() {
  const { form, handlePost, handleChange, fileInputRef, handleButtonClick } = useThreads()

  return (
    <form onSubmit={handlePost} encType="multipart/form-data">
      <FormControl 
        display={"flex"} 
        flexDirection={"column"} 
        gap={2} 
        bg={"transparent"}  
        color={"white"}
      >
        <FormLabel>Content</FormLabel>
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Input 
            placeholder="isikan apa yang kamu pikirkan..." 
            name="content" 
            onChange={handleChange} 
            value={form.content}
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
              type="submit"
            >
              Submit
            </Button>
          </Box>
        </Box>
      </FormControl>
    </form>
  )
}