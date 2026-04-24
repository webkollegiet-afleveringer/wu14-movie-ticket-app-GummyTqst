import { createBrowserRouter } from 'react-router'
import Layout from './components/Layout'
import Home from './pages/Home'
import Bookings from './pages/Bookings'
import Settings from './pages/Settings'
import MovieDetails from './pages/MovieDetails'
import Explore from './pages/Explore'
import SeatSelector from './pages/SeatSelector'
import Checkout from './pages/Checkout'
import { homeLoader } from './loaders/homeLoader'
import { exploreLoader } from './loaders/exploreLoader'
import { seatSelectorLoader } from './loaders/seatLoader' 
import Tickets from './pages/Tickets'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home />, loader: homeLoader },
      { path: 'movies', element: <Explore />, loader: exploreLoader },
      { path: 'movie/:id', element: <MovieDetails />, },
      { path: 'movie/:id/select-seats', element: <SeatSelector />, loader: seatSelectorLoader },
      { path: 'movie/:id/checkout', element: <Checkout />, },
      { path: 'tickets', element: <Tickets />, },
      { path: 'bookings', element: <Bookings />, },
      { path: 'settings', element: <Settings /> },
    ],
  },
])

export default router
