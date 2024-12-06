import { lazy } from 'react'
const Navbar = lazy(() => import('../features/navbar/Navbar'))
import { Outlet } from 'react-router-dom'
import Footer from '../features/footer/Footer'

const MainLayout = () => {
  return (
    <>
    <Navbar />
    <Outlet />
    <Footer/>
  </>  )
}

export default MainLayout