import { useMovieStore } from '@/stores/movie'
import { Link } from 'react-router'

export default function Movies() {
  const fetchMovies = useMovieStore(state => state.fetchMovies)
  const movies = useMovieStore(state => state.movies)
  const isLoading = useMovieStore(state => state.isloading)
  const searchText = useMovieStore(state => state.searchText)
  const setSearchText = useMovieStore(state => state.setSearchText)

  return (
    <>
      <div>
        <input
          type="text"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              fetchMovies()
            }
          }}
        />
        <button onClick={fetchMovies}>Search</button>
      </div>
      {isLoading && <div>Loading...</div>}
      <ul>
        {movies.map(movie => {
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
