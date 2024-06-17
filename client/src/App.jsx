import { useState } from 'react'
import './App.css'
import { BrowserRouter } from 'react-router-dom';
import Routes from "@/routes.jsx"


function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
        <Routes/>
    </BrowserRouter>
  )
}

export default App
