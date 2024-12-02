import React from 'react'
import Navbar from '../features/navbar/Navbar'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <>
    <Navbar />
    <Outlet />
  </>  )
}

export default MainLayout