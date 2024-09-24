import { BiSun } from "react-icons/bi";
import { BiMoon } from "react-icons/bi";
import { useColorMode } from '@chakra-ui/react'
import React from 'react'
import logo from '../images/logo.png'
import { Link } from "react-router-dom";

const Header = () => {
    const { colorMode, toggleColorMode } = useColorMode()
    return (
        <div className='h-[70px] w-full px-[5%] flex justify-between items-center border-b-[1px]'>
            <div className='w-[40px] h-[40px]'>
                <img src={logo} alt="" className='w-full h-full'/>
            </div>
            <div className='flex gap-[30px] font-semibold'>
                <Link t='/'>Home</Link>
                <Link to='/eng-to-uzb'>Eng-Uzb</Link>
                <Link to='/uzb-to-eng'>Uzb-Eng</Link>
            </div>
            <button onClick={toggleColorMode} className='text-[30px]'>
                {
                    colorMode === 'light' ? <BiMoon />
                        : <BiSun />
                }
            </button>
        </div>
    )
}

export default Header
