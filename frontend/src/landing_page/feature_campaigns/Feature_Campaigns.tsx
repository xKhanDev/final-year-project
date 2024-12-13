import React, { FC } from 'react'
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi'
import Card from '../../components/landing_page_components/Card'

const Feature_Campaigns:FC = () => {
  return (
    <div className='w-full mt-12 main_bg pb-2 pt-2'>
      <h1 className='capitalize font-bold text-2xl'>Feature campaigns</h1>
      <div className='w-full flex flex-col lg:flex-row lg:flex-wrap gap-8 my-6'>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  )
}

export default Feature_Campaigns