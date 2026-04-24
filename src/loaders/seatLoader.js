import { API as cinemasAPI } from "../api/cinemas";
import { API as tmdbAPI } from "../api/tmdb";

export const seatSelectorLoader = async ({ params }) => {
  const { id } = params;
  let cinemas = [];
  let movie = null;
  
  try {
    const location = await cinemasAPI.getUserLocation();
    cinemas = await cinemasAPI.getNearbyCinemas(location.lat, location.lon);
  } catch (error) {
    console.error("Could not get location for seat selector:", error);
  }
  
  try {
    movie = await tmdbAPI.getMovieDetails(id);
  } catch (error) {
    console.error("Could not get movie details:", error);
  }
  
  return { cinemas, movie };
};