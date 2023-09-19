

import React from 'react'
import { DetailsHeader, Loader, Error } from '../components'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useGetSongDeatailsQuery } from '../redux/services/shazamCore'
import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query'

export default function SongDetails() {
    const dispatch = useDispatch()
    const { songid } = useParams()
    const { activeSong, isPlaying } = useSelector(state => state.player)
    const { data: songData, isFetching: isFetchingSong, error } = useGetSongDeatailsQuery(songid)

    if(isFetchingSong) return <Loader title='Shearching song details'/>

    if(error) return <Error/>

    return (
        <div className=' flex flex-col '>
            <DetailsHeader artistId='' songData={songData} />

            <div className=' mb-10'>
                <h2 className='text-white text-3xl font-bold'>Lyrics:</h2>

                <div className="mt-5">
                    {songData?.sections[1]?.type === 'LYRICS' ?
                        songData?.sections[1]?.text.map((line, i) => (
                            <p className='text-gray-400 text-base my-1'> {line} </p>
                        )) : <p className='text-gray-400 text-base'> Sorry, no lyrics found!</p>
                    }
                </div>
            </div>
        </div>
    )
}

