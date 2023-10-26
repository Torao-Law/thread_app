// import { ChangeEvent, useState } from 'react'
// import { API } from '@/libs/api'
// import { FormControl, FormLabel, Input, Box, Button } from "@chakra-ui/react"
// import { useMutation } from '@tanstack/react-query'

// type threadInput = {
//   content: string,
//   image: string,
//   user: number  
// }

// // type fetchTread = {
// //   getThread: () => void
// // }

// export default function FormThread({refetch}: {refetch: () => void}) {
//   const [form, setForm] = useState<threadInput>({
//     content: "",
//     image: "",
//     user: 1
//   })

//   function handleChange(e: ChangeEvent<HTMLInputElement>) {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value
//     })
//   }

//   // async function handlePost() {
//   //   const data = await API.post('/thread', form)
//   //   console.log(data)
//   //   // props.getThread()
//   // }
  
//   const handlePost = useMutation({
//     mutationFn: async () => await API.post('/thread', form),
//     onSuccess: () => {
//       refetch()
//     }
//   })

//   return (
//     <FormControl 
//       display={"flex"} 
//       flexDirection={"column"} 
//       gap={2} 
//       bg={"transparent"} 
//       color={"white"}
//     >
//       <FormLabel>Content</FormLabel>
//       <Input 
//         placeholder="isikan apa yang kamu pikirkan..." 
//         name="content" 
//         onChange={handleChange}
//       />
//       <Input 
//         placeholder="image..." 
//         name="image" 
//         onChange={handleChange}
//       />
//       <Box display={"flex"} justifyContent={"end"}>
//         <Button 
//           backgroundColor={"green"} 
//           color={"white"} 
//           colorScheme="green" 
//           onClick={() => handlePost.mutate()}
//           >
//           Submit
//         </Button>
//       </Box>
//     </FormControl>
//   )
// }


import { FormControl, FormLabel, Input, Box, Button } from "@chakra-ui/react"
import { useThreads } from "@/features/threads/Hooks/useThreads"

export default function FormThread() {
  const { handlePost, handleChange } = useThreads()

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
        onChange={handleChange} 
      />
      <Input 
        placeholder="image..." 
        name="image" 
        onChange={handleChange} 
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
    </FormControl>
  )
}