import { Box } from '@chakra-ui/react';
import { Threads } from '@/features/threads';
import FormThread from '@/features/threads/component/FormThread';
import { useThreads } from '@/features/threads/Hooks/useThreads';

export default function Home() {
  const { getThreads } = useThreads()

  return (
    <Box display={"flex"} justifyContent={"center"}>
      <Box
        display={"flex"}
        alignItems={"center"}
        flexDirection={"column"}
        padding={"20px"}
        width="600px"
        borderRight={"1px solid"}
        borderLeft={"1px solid"}
        borderColor={"brand.grey"}
      >
        <FormThread />

        <Box>
        { getThreads?.map((item: any) => {
            return (
              <Box key={item.id}>
                <Threads
                  user={item.user}
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