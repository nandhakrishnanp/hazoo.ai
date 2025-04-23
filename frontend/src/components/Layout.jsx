import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
const Layout = () => {
  return (
    <div className="flex m-0">
      <Sidebar />
      <div className="flex-1 ">
        <Outlet />
      </div>
    </div>
  )
}

export default Layout