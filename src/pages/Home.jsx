import React from 'react'
import video from '../images/video.mp4'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div className='h-full flex justify-center items-center'>
            {/* <video className="rounded-md w-full h-full object-cover" autoPlay muted loop>
                <source src={video} type="video/mp4" />
            </video> */}
            <Link to='/playing'>
                <button className='btn px-[40px] py-[15px] text-[20px] rounded-md text-white font-bold bg-blue-400 shadow-[0_0_10px_rgb(0,176,255)] animate-bounce'>Play</button>
            </Link>
        </div>
    )
}

export default Home
