
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode } from 'swiper'

import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';
import { useGetTopChartsQuery } from '../redux/services/shazamCore';

import 'swiper/css'
import 'swiper/css/free-mode'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const TopChartCard = ({ song, i, isPlaying, activeSong, handlePauseClick, handlePlayClick }) => {
  return <div className='w-full flex flex-row items-center animate-slidedown
  hover:bg-[#4c426e] py-2 p-2 rounded-lg cursor-pointer mb-2'>
    <h3 className='text-base text-white mr-3 font-bold'> {i + 1}. </h3>
    <div className='w-full flex-1 flex items-center flex-row justify-between'>

      <img className='w-20 h-20 rounded-lg' src={song?.images?.coverart} alt={song.title} />

      <div className='flex-1 flex flex-col justify-center mx-3 '>
         <Link to={`/songs/${song.key}`}>
          <p className='text-white font-bold text-xl truncate max-w-[200px] '> {song?.title} </p>
        </Link>

        <Link to={`/artists/${song.artists[0].adamid}`}>
          <p className='text-gray-300 text-base mt-1'> {song?.subtitle} </p>
        </Link>
      </div>

      <PlayPause
      isPlaying={isPlaying}
      activeSong={activeSong}
      song={song}
      handlePlay={handlePlayClick}
      handlePause={handlePauseClick}
      />
    </div>
  </div>
}

const TopPlay = () => {

  const dispatch = useDispatch()
  const { activeSong, isPlaying } = useSelector(state => state.player)

  const divRef = useRef(null)

  const { data } = useGetTopChartsQuery()
  const topPlays = data?.tracks?.slice(0, 5)

  const handlePlayClick = (song, i) => {
    console.log('play')
    dispatch(playPause(true))
    dispatch(setActiveSong({ song, data, i }))
  }

  const handlePauseClick = (song, i) => {
    console.log('pause ')
    dispatch(playPause(false))
  }

  useEffect(() => {
    divRef?.current?.scrollIntoView({ behavior: 'smooth' })
  })

  return topPlays &&  <div ref={divRef} className='xl:ml-6 ml-0 xl:mb-0 mb-6 
  flex-1 xl:max-w-[500px] max-w-full flex flex-col'>
    <div className='w-full felx flex-col'>
      <div className='flex flex-row items-center justify-between'>
        <h2 className='text-white font-bold text-2xl'>Top Charts</h2>
        <Link to='/top-charts'>
          <p className='text-gray-300 text-base cursor-pointer'>See more</p>
        </Link>
      </div>

      <div className='mt-4 flex flex-col gap-1'>
        {topPlays?.map((song, i) => (
          <TopChartCard
            key={song.key}
            song={song}
            i={i}
            isPlaying={isPlaying}
            activeSong={activeSong}
            handlePauseClick={()=> handlePauseClick(song, i)}
            handlePlayClick={()=>handlePlayClick(song, i)}
          />
        ))}
      </div>
    </div>

    <div className='w-full flex flex-col mt-8'>
      <div className='w-full felx flex-col'>
        <div className='flex flex-row items-center justify-between'>
          <h2 className='text-white font-bold text-2xl'>Top Artists</h2>
          <Link to='/top-artists'>
            <p className='text-gray-300 text-base cursor-pointer'>See more</p>
          </Link>
        </div>
      </div>

      <Swiper
        slidesPerView='auto'
        spaceBetween={15}
        freeMode
        centeredSlides
        centeredSlidesBounds
        modules={[FreeMode]}
        className='mt-4'
      >
        {topPlays?.map((song, i) => (
          <SwiperSlide
          key={song?.key}
          style={{width : '25%', height : 'auto' }}
          className='shadow-lg rounded-full animate-silderight'
          >
            <Link to={`/artists/${song?.artists[0].adamid}`}>
              <img src={song?.images.background} alt="name"  className='w-full rounded-full object-cover'/>
            </Link>
          </SwiperSlide>
        ))}

      </Swiper>
    </div>
  </div>
}


export default TopPlay;
