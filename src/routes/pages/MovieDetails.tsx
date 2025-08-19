import { useEffect } from 'react'
import { useMovieStore } from '@/stores/movie'
import { useParams } from 'react-router'

const infos = ['Actors', 'Director', 'Writer', 'Production', 'Genre'] as const

export default function MovieDetails() {
  const { movieId } = useParams()
  const fetchMovie = useMovieStore(state => state.fetchMovie)
  const movie = useMovieStore(state => state.currentMovie)
  useEffect(() => {
    fetchMovie(movieId)
  }, [])

  return (
    <div className="mx-auto flex max-w-[1400px] gap-[30px]">
      {movie && (
        <>
          <div>
            <img
              src={movie.Poster.replace('SX300', 'SX1000')}
              alt={movie.Title}
              className="max-w-[700px]"
            />
          </div>
          <div>
            <h1 className="text-[70px] font-bold">{movie.Title}</h1>
            <p>{movie.Plot}</p>
            {infos.map(info => (
              <div key={info}>
                <h3 className="mt-[20px] text-[20px] font-bold">{info}</h3>
                <p>{movie[info]}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
