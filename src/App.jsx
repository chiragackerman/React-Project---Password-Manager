import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Manager from './components/Manager'
import BackgroundVideo from './assets/background/Gradient.mp4'
import Footer from './components/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <video
      src={BackgroundVideo}
      autoPlay
      muted
      loop
      playsInline
      className="fixed blur-lg top-0 left-0 w-full h-full object-cover z-[-1]"
    ></video>
      <Navbar/>
      <Manager/>
      <Footer/>
    </>
  )
}

export default App
