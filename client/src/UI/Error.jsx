

import React from 'react'
import image from "../Assets/Error.svg";


export default function Error({ message, btn }) {
    return (
        <div className="flex flex-row-reverse justify-evenly items-center">
            <img src={image} alt="Error" className='w-1/5 h-1/5' />
            <div>
                <h1 className='font-bold text-2xl font-Bai_Jamjuree my-4'>Oops! Something went wrong.</h1>
                <p>Sorry, we are unable to load {message}</p>
                <p> Please try again later.</p>
                {btn &&
                    <button
                        className="flex my-4 justify-center items-center space-x-2 px-3 py-1 bg-[#fc8d7e] rounded-md font-normal text-sm text-black shadow-lg transition-all w-7/12 h-10 duration-250 overflow-hidden group hover:shadow-xl hover:bg-[#f76552]"
                    >
                        <span>Reload</span>
                    </button>
                }
            </div>

        </div>
    )
}
