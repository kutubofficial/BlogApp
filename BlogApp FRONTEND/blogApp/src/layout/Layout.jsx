import React from 'react'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import Navbar from '../components/nav/Navbar';

const Layout = () => {
  return (
    <div>
      <Navbar/>
      <Outlet/>
      <ToastContainer/>
    </div>
  )
}

export default Layout