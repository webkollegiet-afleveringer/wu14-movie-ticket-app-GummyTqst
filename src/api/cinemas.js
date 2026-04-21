const API_KEY = import.meta.env.VITE_GEOAPIFY_API_KEY;
const BASE_URL = "https://api.geoapify.com/v2/places";
const CACHE_KEY = "nearby_cinemas_cache";

// Updated to 24 hours
const CACHE_EXPIRATION = 24 * 60 * 60 * 1000; 

export const API = {
  getUserLocation: () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation not supported"));
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (position) => resolve({ lat: position.coords.latitude, lon: position.coords.longitude }),
        (error) => reject(error)
      );
    });
  },

  getNearbyCinemas: async (lat, lon) => {
    // 1. Check if we have a valid cache
    const cachedData = localStorage.getItem(CACHE_KEY);
    
    if (cachedData) {
      const { timestamp, data, coords } = JSON.parse(cachedData);
      const isExpired = Date.now() - timestamp > CACHE_EXPIRATION;
      
      // We still keep the "location drift" check. 
      // If the user moves ~1km, we should probably update even if 24h haven't passed.
      const locationMoved = Math.abs(coords.lat - lat) > 0.01 || Math.abs(coords.lon - lon) > 0.01;

      if (!isExpired && !locationMoved) {
        console.log("Serving cinemas from 24h cache ⚡");
        return data;
      }
    }

    // 2. Fetch fresh data if cache is old or user moved
    console.log("Cache expired or location changed. Fetching from Geoapify...");
    const url = `${BASE_URL}?categories=entertainment.cinema&filter=circle:${lon},${lat},10000&bias=proximity:${lon},${lat}&limit=5&apiKey=${API_KEY}`;
    
    try {
      const response = await fetch(url);
      const result = await response.json();
      
      // Remember Geoapify uses 'features'
      const cinemas = result.features || [];

      // 3. Save to localStorage
      localStorage.setItem(CACHE_KEY, JSON.stringify({
        timestamp: Date.now(),
        coords: { lat, lon },
        data: cinemas
      }));

      return cinemas;
    } catch (error) {
      console.error("API Fetch failed:", error);
      return [];
    }
  }
};