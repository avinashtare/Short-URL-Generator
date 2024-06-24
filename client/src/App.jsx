import './App.css'
import Navbar from '@/components/Navbar/Navbar';
import Routes from "@/routes"
import Fotter from '@/components/Fotter';
import Toastify from '@/components/Toastify';

function App() {
  return (
    <>
      <Navbar />
      <Routes />
      <Toastify />
      <Fotter />
    </>
  )
}

export default App