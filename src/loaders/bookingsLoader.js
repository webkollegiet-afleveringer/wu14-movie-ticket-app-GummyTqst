import { API as cinemasAPI } from "../api/cinemas";

export const bookingsLoader = async () => {
    let cinemas = [];
    let dates = [];
    let times = [];

    try {
        const location = await cinemasAPI.getUserLocation();
        cinemas = await cinemasAPI.getNearbyCinemas(location.lat, location.lon);
    } catch (error) {
        console.error("Could not get location:", error);
    }

    // Generate dates (today + 6 days)
    dates = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() + i);
        return date.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
    });

    times = ["10.00 AM", "01.00 PM", "04.00 PM", "07.00 PM", "10.00 PM"];

    return { cinemas, dates, times };
};