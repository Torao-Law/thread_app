
import { Threads } from "@/features/threads"
import { Navbar, MyProfile, Footer, SuggestedFollow } from "@/components";
import { Box } from "@chakra-ui/react"
import { API } from "@/libs/api";
import { useQuery } from "@tanstack/react-query";
import FormThread from "@/features/threads/component/FormThread";


export function Home() {
  const { data: threads, refetch } = useQuery({
    queryKey: ['threads'],
    queryFn: async () => await API.get('/threads').then((res) => res.data)
  })

  return (
    <Box display={"flex"} justifyContent={"center"}>
      <Box
        display={"flex"}
        width={"300px"}
        position={"fixed"}
        left={"30px"}
        top={"30px"}
        height={"fit-content"}
      >
        <Navbar />
      </Box>
    
      <Box
        display={"flex"}
        alignItems={"center"}
        flexDirection={"column"}
        padding={"10px"}
      >
        <FormThread 
          refetch={refetch}
        />

        { threads?.map((data: any) => {
          return (
            <div key={data.id}>
              <Threads 
                id={data.id}
                author_picture={data.author_picture}
                author_name={data.author_name}
                author_username={data.author_username}
                posted_at={data.posted_at}
                content={data.content}
                image={data.image}
                likes_count={data.likes_count}
                replies_count={data.replies_count}
                users={data.users}
              />
            </div>
          )
        })}
      </Box>

      <Box
        display={"flex"}
        flexDirection={"column"}
        gap={5}
        position={"fixed"}
        right={"30px"}
        top={"30px"}
      >
        <MyProfile />
        <SuggestedFollow />
        <Footer />
      </Box>
    </Box>
  )
}

// import { useState, useEffect } from "react";
// import { ThreadCard, Threads } from "@/features/threads"
// import { Navbar } from "@/components";
// import { Footer } from "@/components/Footer";
// import { MyProfile } from "@/components/MyProfile";
// import { Box } from "@chakra-ui/react";
// import { API } from "@/libs/api";
// import SuggestedFollow from "@/components/SuggestedFollow";
// import FormThread from "@/features/threads/component/FormThread";

// export function Home() {
//   const [threads, setSetTreads] = useState<ThreadCard[]>()

//   async function getThreads() {
//     try {
//       const response = await API.get('/threads');
//       setSetTreads(response?.data);
//     } catch (err) {
//       throw err
//     }
//   }

//   useEffect(() => {
//     getThreads()
//   }, [])

//   console.log(threads);
  

//   return (
//     <Box display={"flex"} justifyContent={"center"}>
//       <Box
//         display={"flex"}
//         width={"300px"}
//         position={"fixed"}
//         left={"30px"}
//         top={"30px"}
//         height={"fit-content"}
//       >
//         <Navbar />
//       </Box>
    
//       <Box
//         display={"flex"}
//         alignItems={"center"}
//         flexDirection={"column"}
//         padding={"10px"}
//       >
//         <FormThread 
//           getThread={getThreads}
//         />
//         { threads?.map((data, index) => {
//           return (
//             <div key={index}>
//               <Threads 
//                 id={data.id}
//                 author_picture={data.author_picture}
//                 author_name={data.author_name}
//                 author_username={data.author_username}
//                 posted_at={data.posted_at}
//                 content={data.content}
//                 image={data.image}
//                 likes_count={data.likes_count}
//                 replies_count={data.replies_count}
//                 users={data.users}
//               />
//             </div>
//           )
//         })}
//       </Box>

//       <Box
//         display={"flex"}
//         flexDirection={"column"}
//         gap={5}
//         position={"fixed"}
//         right={"30px"}
//         top={"30px"}
//       >
//         <MyProfile />
//         <SuggestedFollow />
//         <Footer />
//       </Box>
//     </Box>
//   )
// }