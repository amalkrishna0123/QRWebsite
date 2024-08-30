import Home from "./components/Home"
import Loader from "./components/Loader"
import Login from "./components/Login"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"



function App() {
  

  return (
    <Router>
      <Routes>
        <Home path='/' element={<Home/>}/>
        <Loader path='/path' element={<Loader/>}/>
        <Login path='/AdminLogin' element={<Login/>}/>
      </Routes>
    </Router>
  )
}

export default App
