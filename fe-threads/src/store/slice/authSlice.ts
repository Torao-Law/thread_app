import { setAuthToken } from "@/libs/api";
import { IUser } from "@/types/User";
import { createSlice } from "@reduxjs/toolkit";

const initiaslState: IUser = {
  id: 0,
  full_name: "",
  username: "",
  email: "",
  picture: "",
  description: ""
}

export const authSlice = createSlice({
  name: "auth",
  initialState: initiaslState,
  reducers: {
    AUTH_LOGIN: (_, action) => {
      const payload = action.payload
      setAuthToken(payload.token)
      localStorage.setItem("token", payload.token)

      const user: IUser = {
        id: payload.user.id,
        full_name: payload.user.full_name,
        username: payload.user.username,
        email: payload.user.email,
        description: payload.user.description,
        picture: payload.user.picture
      }

      return user
    },
    AUTH_CHECK: (_, action) => {
      const payload = action.payload

      const user: IUser = {
        id: payload.id,
        full_name: payload.full_name,
        username: payload.username,
        email: payload.email,
        picture: payload.picture,
        description: payload.description
      }

      return user
    },
    AUTH_ERROR: () => {
      localStorage.removeItem("token")
    },
    AUTH_LOGOUT: () => {
      localStorage.removeItem("token")
    },
  },
})