import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Navbar } from './components/Navbar'
import Footer from './components/Footer'
import { Employeelist } from './components/Employeelist'
import { InsertEmployee } from './components/InsertEmployee'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar></Navbar>
    <InsertEmployee/>
    <Employeelist/>
    <Footer></Footer>
    
    </>
  )
}

export default App
