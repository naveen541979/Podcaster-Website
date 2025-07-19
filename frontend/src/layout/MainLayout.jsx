import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import {Outlet} from 'react-router-dom'
import Audioplayer from '../components/Audioplayer/Audioplayer'

const MainLayout = () => {
  return (
    <div className="relative">
        <Navbar/>
        <main>
          <Outlet/>
        </main>
        <div className="w-full">
          <Audioplayer/>
        </div>
    </div>
  )
}

export default MainLayout