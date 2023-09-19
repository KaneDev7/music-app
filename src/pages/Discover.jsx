import { Error, Loader, SongCard } from '../components'
import { genres } from '../assets/constants'
import { useGetTopChartsQuery } from '../redux/services/shazamCore';
import { useSelector } from 'react-redux';

const Discover = () => {
    const {isPlaying, activeSong} = useSelector((state) => state.player)
    const { data, isFetching, error } = useGetTopChartsQuery()

    if (isFetching) return <Loader title={'loading...'} />

    if (error) return <Error />

    return <div className='flex flex-col'>
        <div className=' w-full flex justify-between items-center
         sm:flex-row flex-col mt-4 mb-10'>
            <h2 className=' font-bold text-white text-3xl text-left'> Discover </h2>
            <select
                onChange={() => { }}
                value=""
                className=' bg-black text-gray-300 p-3 text-sm rounded-lg outline-none
             sm:mt-0 mt-5 '
            >
                {genres.map(genre => <option value={genre.value} key={genre.value}> {genre.title} </option>)}
            </select>
        </div>
        <div className='flex flex-wrap sm:justify-start justify-center gap-8 '>
            {data?.tracks?.map((song, i) => (
                <SongCard
                    key={song.key} 
                    song={song}
                    isPlaying={isPlaying}
                    activeSong={activeSong}
                    data={data?.tracks}
                    i={i}
                />
            ))}
        </div>
    </div>;
}

export default Discover;
