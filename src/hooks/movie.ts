import { useMovieStore } from '@/stores/movie'
import { queryOptions, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { uniqBy } from 'lodash-es'

export interface MoviesResponse {
  Search: Movie[]
  totalResults: string
  Response: string
}

export interface Movie {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

export interface MovieDetails {
  Title: string
  Year: string
  Rated: string
  Released: string
  Runtime: string
  Genre: string
  Director: string
  Writer: string
  Actors: string
  Plot: string
  Language: string
  Country: string
  Awards: string
  Poster: string
  Ratings: Rating[]
  Metascore: string
  imdbRating: string
  imdbVotes: string
  imdbID: string
  Type: string
  DVD: string
  BoxOffice: string
  Production: string
  Website: string
  Response: string
}

export interface Rating {
  Source: string
  Value: string
}

export function useMovies() {
  // main에서 정의한 queryClient 가져옴
  const queryClient = useQueryClient()
  const searchText = useMovieStore(state => state.searchText)
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
    staleTime: 1000 * 60 * 60,
    select: movies => uniqBy(movies, 'imdbID'),
  })

  const result = useQuery(options)
  return {
    ...result,
    fetchQuery: () => queryClient.fetchQuery(options),
  }
}

export function useMovie(movieId?: string) {
  return useQuery({
    queryKey: ['movie', movieId],
    queryFn: async () => {
      if (!movieId) return
      const { data } = await axios<MovieDetails>(
        `https://omdbapi.com?apikey=7035c60c&i=${movieId}`
      )
      return data
    },
    staleTime: 1000 * 60 * 60,
  })
}
