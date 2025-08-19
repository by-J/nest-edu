import { queryOptions, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { uniqBy } from 'lodash-es'
import { create } from 'zustand'
import { combine } from 'zustand/middleware'

export const useMovieStore = create(
  combine(
    {
      searchText: '',
    },
    set => {
      return {
        setSearchText: (searchText: string) => {
          set({ searchText })
        },
      }
    }
  )
)

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

export function useMovies() {
  const searchText = useMovieStore(state => state.searchText)
  const options = queryOptions({
    queryKey: ['movie', searchText],
    queryFn: async () => {
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
}
