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

// export interface MoviesResponse {
//   Search: Movie[]
//   totalResults: string
//   Response: string
// }

// export interface Movie {
//   Title: string
//   Year: string
//   imdbID: string
//   Type: string
//   Poster: string
// }

// export interface MovieDetails {
//   Title: string
//   Year: string
//   Rated: string
//   Released: string
//   Runtime: string
//   Genre: string
//   Director: string
//   Writer: string
//   Actors: string
//   Plot: string
//   Language: string
//   Country: string
//   Awards: string
//   Poster: string
//   Ratings: Rating[]
//   Metascore: string
//   imdbRating: string
//   imdbVotes: string
//   imdbID: string
//   Type: string
//   DVD: string
//   BoxOffice: string
//   Production: string
//   Website: string
//   Response: string
// }

// export interface Rating {
//   Source: string
//   Value: string
// }

// export const useMovieStore = create(
//   combine(
//     {
//       movies: [] as Movie[],
//       searchText: '',
//       isloading: false,
//       currentMovie: null as MovieDetails | null,
//     },
//     (set, get) => {
//       return {
//         setSearchText: (searchText: string) => {
//           set({ searchText })
//         },
//         fetchMovies: async () => {
//           set({
//             isloading: true,
//           })
//           const { searchText } = get()
//           const { data } = await axios<MoviesResponse>(
//             `https://omdbapi.com?apikey=7035c60c&s=${searchText}`
//           )

//           console.log(data)
//           set({
//             // movies: data.Search.filter(value => value.imdbID)
//             movies: uniqBy(data.Search, 'imdbID'),
//             isloading: false,
//           })
//         },
//         fetchMovie: async (id?: string) => {
//           if (!id) {
//             return
//           }

//           const { data } = await axios<MovieDetails>(
//             `https://omdbapi.com?apikey=7035c60c&i=${id}`
//           )
//           set({
//             currentMovie: data,
//           })
//         },
//       }
//     }
//   )
// )
