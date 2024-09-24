import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Navbar } from './components/Navbar'
import Footer from './components/Footer'
import { Employeelist } from './components/Employeelist'
import { InsertEmployee } from './components/InsertEmployee'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
    <Navbar/>
      <Routes>
        <Route path="/list" element={  <Employeelist/>}/>
        <Route path="/insert" element={  <InsertEmployee/>}/>
      </Routes>
    
    <Footer/>
  </Router>
    
  
    
    
    </>
  )
}

export default App
