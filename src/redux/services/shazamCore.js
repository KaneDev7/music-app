import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const shazamCoreApi = createApi({
    reducerPath : 'shazamCoreApi',

    baseQuery : fetchBaseQuery({
        baseUrl : 'https://shazam.p.rapidapi.com',
        prepareHeaders : (headers) =>{
            headers.set('X-RapidAPI-Key', '85dfc8a7ffmsh8393631339b84c5p1d6c80jsn3cbf1a94580a')
            return headers
        }
    }),
    
    endpoints : (builder) =>({
        getTopCharts :builder.query({query : () => `/charts/track`}),
        getSongDeatails: builder.query({query : (songid) => `/songs/get-details?key=${songid}`}),
        getartistsDeatil : builder.query({query : (artistId) => `/artists/get-top-songs?id=${artistId}`})
    })
    
})

export const {
    useGetTopChartsQuery,
    useGetSongDeatailsQuery,
    useGetartistsDeatilQuery
 } = shazamCoreApi