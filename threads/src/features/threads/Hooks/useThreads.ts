import { IThreadCard, IThreadPost } from "@/types/Thread";
import { API } from "@/libs/api";
import { ChangeEvent, FormEvent, useState, useRef } from "react";
import { useQuery } from '@tanstack/react-query';
// import { useParams } from "react-router-dom";


export function useThreads() {
  // const { id } = useParams()
  const [form, setForm] = useState<IThreadPost>({
    content: "",
    image: ""
  });

  const { data: getThreads, refetch } = useQuery<IThreadCard[]>({
    queryKey: ['threads'],
    queryFn: async () => await API.get('/threads?limit=5')
      .then((res) => res.data)
  });

  async function handlePost(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData()
    formData.append("content", form.content)
    formData.append("image", form.image as File)

    await API.post("/thread", formData)

    setForm({
      content: "",
      image: ""
    })
    
    refetch()
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value, files } = event.target

    if(files) {
      setForm({
        ...form,
        [name]: files[0],
      })
    } else {
      setForm({
        ...form,
        [name]: value, 
      });
    }
  }

  const fileInputRef = useRef<HTMLInputElement>(null)

  function handleButtonClick() {
    fileInputRef.current?.click()
  }

  return { form, getThreads, handleChange, handlePost, fileInputRef, handleButtonClick};
}
