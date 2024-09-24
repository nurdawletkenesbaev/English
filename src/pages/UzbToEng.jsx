import React from 'react'
import { words } from '../config/contants'

const UzbToEng = () => {
    const engToUzb = words
    return (
        <div className='flex flex-col gap-[8px] items-center py-[20px]'>
            <div className='flex justify-between w-[90%] md:w-[50%] text-[24px] text-blue-500 px-[5px] py-[10px] rounded-md'>
                <span className='w-[50%]'>Uzb</span>
                <span className='w-[50%]'>Eng</span>
            </div>
            {
                engToUzb.map((item, index) => (
                    <div key={index} className='flex justify-between w-[90%] md:w-[50%] border-[1px] sm:text-[15px] border-gry-300 px-[5px] py-[10px] rounded-md shadow-md'>
                        <span className='w-[50%]'><span className='text-blue-500'>{index+1}.</span>  {item.uzb}</span>
                        <span className='w-[50%] sm:text-end md:text-start'>-{item.eng}</span>
                    </div>
                ))
            }
        </div>
    )
}

export default UzbToEng
