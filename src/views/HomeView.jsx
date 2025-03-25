import React from 'react'
import NewFeaturesButton from '../components/home/NewFeaturesButton'

const HomeView = () => {
  return (
    <div className='grid place-items-center '>
      <NewFeaturesButton />
      
      <h1 className='pt-7 font-Oswald'>Your digital study 9niyet!!</h1>
      <h2>The ultimate platform for ENSAM Casablanca students to connect, 
          collaborate, and succeed academically and professionally.
      </h2>

      <div class="w-0.5 bg-gray-300 h-32"></div>

    </div>
  )
}

export default HomeView
