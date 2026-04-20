import { createBrowserRouter } from 'react-router'
import Layout from './components/Layout'
import Home from './pages/Home'
import Bookings from './pages/Bookings'
import Settings from './pages/Settings'
import MovieDetails from './pages/MovieDetails'
import Explore from './pages/Explore'
import SeatSelector from './pages/SeatSelector'
import Checkout from './pages/Checkout'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'movies', element: <Explore />, },
      { path: 'movie/:id', element: <MovieDetails />, },
      { path: 'movie/:id/select-seats', element: <SeatSelector />, },
      { path: 'movie/:id/checkout', element: <Checkout />, },
      { path: 'bookings', element: <Bookings />, },
      { path: 'settings', element: <Settings /> },
    ],
  },
])

export default router