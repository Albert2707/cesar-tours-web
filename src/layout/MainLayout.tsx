import { lazy } from 'react'
const Navbar = lazy(() => import('../features/navbar/Navbar'))
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <>
    <Navbar />
    <Outlet />
  </>  )
}

export default MainLayout