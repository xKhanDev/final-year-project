import React, { FC } from 'react'

const Works:FC = () => {
  return (
    <div className='w-full flex flex-col mt-6'>
      <span className='w-full h-12 border-t-[0.5px] border-b-[0.5px] border-gray-400 flex items-center justify-center font_text mb-6'>
      <marquee behavior="scroll" direction="left">
        <h1>Your Small Contribution Can Make A Big Difference</h1>
      </marquee>
      </span>

      <h2 className='font-bold text-xl mb-6 md:text-2xl lg:text-2xl lg:pt-4'>
      Step-by-step process
      </h2>

      <div className='flex flex-col lg:flex-row justify-between items-center gap-6 lg:gap-0 mt-4 w-full'>
        <div className='w-[60%] flex flex-col gap-3 border-[0.5px] border-green-500 rounded-md p-4'>
          <span className='text-blue-950 size-9 rounded-full green_bg content-center text-center font-semibold my-0 mx-auto -mt-8'>1</span>
          <img src="/connect.png" alt="" className='size-24 my-0 mx-auto'/>
          <h1 className='font-semibold text-center'>Connect Wallet</h1>
        </div>
        <span className='hidden w-full lg:flex flex-col h-[0.15px] bg-green-500'></span>
        <div className='w-[60%] flex flex-col gap-3 border-[0.5px] border-green-500 rounded-md p-4'>
          <span className='text-blue-950 size-9 rounded-full green_bg content-center text-center font-semibold my-0 mx-auto -mt-8'>2</span>
          <img src="/explore.png" alt="" className='size-24 my-0 mx-auto'/>
          <h1 className='font-semibold text-center'>Browse Campaigns</h1>
        </div>
        <span className='hidden w-full lg:flex flex-col h-[0.15px] bg-green-500'></span>
        <div className='w-[60%] flex flex-col gap-3 border-[0.5px] border-green-500 rounded-md p-4'>
          <span className='text-blue-950 size-9 rounded-full green_bg content-center text-center font-semibold my-0 mx-auto -mt-8'>3</span>
          <img src="/send.png" alt="" className='size-24 my-0 mx-auto'/>
          <h1 className='font-semibold text-center'>Donate or Create</h1>
        </div>
      </div>
      
    </div>
  )
}

export default Works