import { FormControl, FormLabel, Input, Box, Button } from "@chakra-ui/react"

export default function FormThread() {
  return (
    <FormControl 
      display={"flex"} 
      flexDirection={"column"} 
      gap={2} 
      bg={"transparent"} 
      color={"white"}
    >
      <FormLabel>Content</FormLabel>
      <Input 
        placeholder="isikan apa yang kamu pikirkan..." 
        name="content" 
      />
      <Input 
        placeholder="image..." 
        name="image" 
      />
      <Box display={"flex"} justifyContent={"end"}>
        <Button 
          backgroundColor={"green"} 
          color={"white"} 
          colorScheme="green" 
          >
          Submit
        </Button>
      </Box>
    </FormControl>
  )
}