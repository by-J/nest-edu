import { useMovieStore } from '@/stores/movie'
import { useQuery, useQueryClient, queryOptions } from '@tanstack/react-query'
import axios from 'axios'
import { Link } from 'react-router'
import type { MoviesResponse } from '@/stores/movie'
import { useState } from 'react'
import { uniqBy } from 'lodash-es'

export default function Movies() {
  // const fetchMovies = useMovieStore(state => state.fetchMovies)
  // const movies = useMovieStore(state => state.movies)
  // const isLoading = useMovieStore(state => state.isloading)
  const searchText = useMovieStore(state => state.searchText)
  const setSearchText = useMovieStore(state => state.setSearchText)
  const [inputText, setInputText] = useState(searchText)
  // main에서 정의한 queryClient 가져옴
  const queryClient = useQueryClient()

  const options = queryOptions({
    queryKey: ['movie', searchText],
    queryFn: async () => {
      if (searchText.length < 3) return []
      const { data } = await axios<MoviesResponse>(
        `https://omdbapi.com?apikey=7035c60c&s=${searchText}`
      )
      return data.Search
    },
    enabled: !!searchText,
    staleTime: 1000 * 3,
    select: movies => uniqBy(movies, 'imdbID'),
  })

  const { data: movies = [], isFetching } = useQuery(options)

  function fetchMovies() {
    setSearchText(inputText)
    inputText && queryClient.fetchQuery(options)
  }

  return (
    <>
      <div>
        <input
          type="text"
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              fetchMovies()
            }
          }}
        />
        <button onClick={() => fetchMovies()}>Search</button>
      </div>
      {isFetching && <div>Loading...</div>}
      <ul>
        {movies?.map(movie => {
          return (
            <li key={movie.imdbID}>
              <Link to={`/movies/${movie.imdbID}`}>
                <h3>
                  {movie.Title}({movie.Year})
                </h3>
              </Link>
            </li>
          )
        })}
      </ul>
    </>
  )
}
