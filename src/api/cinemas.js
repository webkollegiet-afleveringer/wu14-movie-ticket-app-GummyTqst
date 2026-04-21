const API_KEY = import.meta.env.VITE_GEOAPIFY_API_KEY;
const BASE_URL = "https://api.geoapify.com/v2/places";

console.log("Geoapify API Key:", API_KEY);

export const API = {
  getUserLocation: () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation not supported"));
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("User location:", position.coords);
          resolve({ lat: position.coords.latitude, lon: position.coords.longitude });
        },
        (error) => {
          console.error("Geolocation error:", error);
          reject(error);
        }
      );
    });
  },

  getNearbyCinemas: async (lat, lon) => {
    console.log("Fetching cinemas for:", lat, lon);
    const url = `${BASE_URL}?categories=entertainment.cinema&filter=circle:${lon},${lat},10000&limit=5&apiKey=${API_KEY}`;
    console.log("Fetching URL:", url);
    
    const response = await fetch(url);
    const data = await response.json();
    console.log("Geoapify response:", data);
    return data.results || [];
  }
};