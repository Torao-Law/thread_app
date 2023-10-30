import { RootState } from "./store/type/RootState"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { API, setAuthToken } from "./libs/api"
import { useEffect, useState } from "react"
import { AUTH_CHECK, AUTH_ERROR } from "./store/RootReducer"
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import { Routes, Route, Navigate, Outlet, useNavigate } from "react-router-dom"
import Home from "./pages/Home"
import Register from "./pages/Register"
import Main from "./layout/Main"
import Login from "./pages/Login"

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'darkBackground',
      }
    }
  },
  colors: {
    darkBackground: '#222'
  }
})

// setAuthToken => apakah sudah token ? akses : login/register
function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const auth = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  async function authCheck() {
    try {
      setAuthToken(localStorage.token)
      const response = await API.get('/auth/check')
      console.log("authCheck : ", response)
      dispatch(AUTH_CHECK(response.data.user))
      setIsLoading(false)
    } catch (err) {
      dispatch(AUTH_ERROR())
      console.log("auth check error", err)
      setIsLoading(false)
      navigate('/auth/login')
    }
  }

  useEffect(() => {
    if (localStorage.token) {
      authCheck()
    } else {
      setIsLoading(false)
    }
  }, [])

  function IsNotLogin() {
    if (!auth.username) {
      return <Navigate to={"/auth/login"} />;
    } else {
      return <Outlet />;
    }
  }

  function IsLogin() {
    if (auth.username) {
      return <Navigate to={"/"} />;
    } else {
      return <Outlet />;
    }
  }

  return (
    <>
      {
        isLoading ? null : 
          <ChakraProvider theme={theme}>
          <Routes>
            <Route path="/" element={<IsNotLogin />}>
              <Route
                path="/"
                element={
                  <Main>
                    <Home />
                  </Main>
                }
              />
            </Route> 
            
            <Route path="/" element={<IsLogin />}>
              <Route path="/auth/register" element={ <Register />} />
              <Route path="/auth/login" element={<Login />} />
            </Route>
          </Routes>
        </ChakraProvider>
      }
    </>
    
  )
}

export default App


