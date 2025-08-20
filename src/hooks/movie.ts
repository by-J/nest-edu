import { useMovieStore } from '@/stores/movie'
import {
  queryOptions,
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
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

export function useInfiniteMovies() {
  const searchText = useMovieStore(state => state.searchText)
  return useInfiniteQuery({
    queryKey: ['movies', searchText],
    queryFn: async pageParam => {
      if (searchText.length < 3) return
      // await new Promise(resolve => setTimeout(resolve, 1500))
      const { data } = await axios<MoviesResponse>(
        `https://omdbapi.com?apikey=7035c60c&s=${searchText}&page=${pageParam.pageParam}`
      )
      return data //page
    },
    //lastpage 3, pages [1,2,3]
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage) return null
      const { totalResults } = lastPage
      const total = Number.parseInt(totalResults, 10)
      const maxPage = Math.ceil(total / 10)
      const currentPage = pages.length
      if (lastPage.Response === 'True' && currentPage < maxPage) {
        return currentPage + 1
      }
      return null
    },
    initialPageParam: 1,
    enabled: Boolean(searchText),
    staleTime: 1000 * 60 * 60,
    select: data => {
      return {
        ...data,
        pages: data.pages.map(page => {
          if (!page) return page
          return {
            ...page,
            Search: uniqBy(page.Search, 'imdbID'),
          }
        }),
      }
    },
  })
}
