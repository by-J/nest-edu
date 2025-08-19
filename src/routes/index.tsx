import { createBrowserRouter, RouterProvider } from 'react-router'
import DefaultLayout from '@/routes/layouts/default'
import Home from '@/routes/pages/Home'
import About from '@/routes/pages/About'
import Movies from '@/routes/pages/Movies'
import MovieDetails from '@/routes/pages/MovieDetails'
import SignIn from '@/routes/pages/SignIn'
import { guestOnly, requiresAuth } from './loaders'
import Error from './pages/Error'

const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    // errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/movies',
        element: <Movies />,
        loader: requiresAuth,
      },
      {
        path: '/movies/:movieId',
        element: <MovieDetails />,
        loader: requiresAuth,
      },
      {
        path: '/signin',
        element: <SignIn />,
        loader: guestOnly,
      },
    ],
  },
  {
    path: '*',
    element: <Error />,
  },
])

export default function Router() {
  return <RouterProvider router={router} />
}
