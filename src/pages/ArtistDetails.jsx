
import React from 'react'
import { DetailsHeader, Loader, Error } from '../components'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useGetartistsDeatilQuery } from '../redux/services/shazamCore'

export default function ArtistDetails() {

    const { artistId } = useParams()
    const { data: artistData, isFetching: isFetchingArtists, error } = useGetartistsDeatilQuery(artistId)


    if (isFetchingArtists) return <Loader title='Shearching artist details' />

    if (error) return <Error />

    return (
        <div className=' flex flex-col '>
            <ul>
            <li className='text-white text3xl mt-5 font-bold'> artist Name : 
              <span className='text-sm text-gray-300 ml-2 font-normal'>{artistData.data[0].attributes.artistName} </span>
            </li>

            <li className='text-white text3xl mt-5 font-bold'> All albums :  
                {artistData?.data?.map(song =>(
                 <span className='text-sm text-gray-300 ml-2 font-normal'>{song.attributes.albumName},</span>
                ))}
             </li>

             <li className='text-white text3xl mt-5 font-bold'> songs names :  
                {artistData?.data?.map(song =>(
                 <span className='text-sm text-gray-300 ml-2 font-normal'>{song.attributes.name},</span>
                ))}
             </li>


            </ul>


        </div>
    )
}

