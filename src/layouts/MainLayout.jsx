import React from 'react'
import Header from '../components/Header'
import Content from '../components/Content'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div>
      <Header/>
      <Content>
        <Outlet/>
      </Content>
    </div>
  )
}

export default MainLayout
