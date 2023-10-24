import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import { Home } from "./pages"
import { DetailThread } from "./pages/detailthread"

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

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/detail-thread/:id" element={<DetailThread />} />
        </Routes>
      </Router>
    </ChakraProvider>
  )
}

export default App


