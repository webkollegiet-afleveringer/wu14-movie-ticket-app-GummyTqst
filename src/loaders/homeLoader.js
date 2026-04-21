import { API as tmdbAPI } from "../api/tmdb";
import { API as cinemasAPI } from "../api/cinemas";

export const homeLoader = async () => {
  console.log("Home loader starting...");

  const [upcoming, trending] = await Promise.all([
    tmdbAPI.getUpcoming(),
    tmdbAPI.getTrending()
  ]);

  console.log("Upcoming movies:", upcoming);
  console.log("Trending movies:", trending);

  let cinemas = [];
  try {
    const location = await cinemasAPI.getUserLocation();
    cinemas = await cinemasAPI.getNearbyCinemas(location.lat, location.lon);
  } catch (error) {
    console.log("Could not get location:", error.message);
  }

  console.log("Cinemas:", cinemas);

  return { upcoming: upcoming || [], trending: trending || [], cinemas };
};