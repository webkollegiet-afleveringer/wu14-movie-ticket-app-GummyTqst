// seatLoader.js or added to homeLoader.js
import { API as cinemasAPI } from "../api/cinemas";

export const seatSelectorLoader = async () => {
  let cinemas = [];
  try {
    const location = await cinemasAPI.getUserLocation();
    cinemas = await cinemasAPI.getNearbyCinemas(location.lat, location.lon);
  } catch (error) {
    console.error("Could not get location for seat selector:", error);
  }
  return { cinemas };
};