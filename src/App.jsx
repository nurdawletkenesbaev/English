import React from 'react'
import Header from './components/Header'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Home from './pages/Home'
import EngToUzb from './pages/EngToUzb'
import UzbToEng from './pages/UzbToEng'
import MainLayout from './layouts/MainLayout'
import Play from './pages/Play'
import './App.css'

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout/>}>
        <Route index element={<Home/>}/>
        <Route path='/eng-to-uzb' element={<EngToUzb/>}/>
        <Route path='/uzb-to-eng' element={<UzbToEng/>}/>
        <Route path='/playing' element={<Play/>}/>
      </Route>
    )
  )
  return (
    <RouterProvider router={router}/>
  )
}

export default App
