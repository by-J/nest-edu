import { Link } from 'react-router'
import { useState } from 'react'
import { useMovies } from '@/hooks/movie'
import { useMovieStore } from '@/stores/movie'

export default function Movies() {
  const searchText = useMovieStore(state => state.searchText)
  const setSearchText = useMovieStore(state => state.setSearchText)
  const [inputText, setInputText] = useState(searchText)

  const { data: movies = [], isFetching, fetchQuery } = useMovies()

  function fetchMovies() {
    setSearchText(inputText)
    fetchQuery()
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
