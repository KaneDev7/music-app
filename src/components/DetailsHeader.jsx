

import React from 'react'
import { Link } from 'react-router-dom'

export default function DetailsHeader({ artistId, songData }) {
  return (
    <div className=' relative w-full flex flex-col'>
      <div className='w-full bg-gradient-to-t 
      from-transparent to-black sm:h-48 h-28'>
        <div className='absolute inset-0 flex items-center'>
          <img
            src={songData?.images.coverart}
            alt=""
            className='sm:w-48 w-28 sm:h-48 h-48 rounded-full 
            object-cover border-2 shadow-xl shadow-black'
          />

          <div className='ml-5'>
            <p className='text-white text-xl sm:text-3xl font-bold'> {songData?.title}  </p>

            {!artistId &&
              <Link to={`/artists/${songData?.artists[0].adamid}`}>
                <p className='text-base text-gray-400 mt-2'> {songData?.subtitle} </p>
              </Link>
            }

              <p className='text-base text-gray-400 mt-2'> {songData?.genres?.primary} </p>

          </div>
        </div>
      </div>
      <div className='w-full sm:h-44 h-24'/>

    </div>
  )
}

