import { useState, ChangeEvent } from "react";
import { IUserRegister } from "@/types/User";
import { API } from "@/libs/api";

export function useRegister() {
  const [form, setForm] = useState<IUserRegister>({
    full_name: "",
    username: "",
    email: "",
    password: ""
  })

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  async function handleRegister() {
    try {
      const response = await API.post('/auth/register', form)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  return { form, handleChange, handleRegister };
}