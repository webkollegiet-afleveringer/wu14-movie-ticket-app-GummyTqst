import { useState, useEffect } from "react";
import Header from "../components/Header";
import { MovieCardVertical } from "../components/MovieCard";
import { API } from "../api/tmdb";

export default function Explore() {
  const [activeTab, setActiveTab] = useState("nowShowing");
  const [topMovies, setTopMovies] = useState([]);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        if (activeTab === "nowShowing") {
          const [top, recommended] = await Promise.all([
            API.getTopRated(),
            API.getRecommended()
          ]);
          setTopMovies(top || []);
          setRecommendedMovies(recommended || []);
        } else {
          const upcoming = await API.getUpcoming();
          setUpcomingMovies(upcoming || []);
        }
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [activeTab]);

  return (
    <div className="pb-24">
      <Header back title="Explore" search />
      
      <div className="flex gap-2 px-4 mt-4">
        <button
          onClick={() => setActiveTab("nowShowing")}
          className={`flex-1 py-3 rounded-xl font-medium transition-all ${
            activeTab === "nowShowing" 
              ? "bg-accent text-white" 
              : "bg-gray-800 text-gray-400"
          }`}
        >
          Now Showing
        </button>
        <button
          onClick={() => setActiveTab("upcoming")}
          className={`flex-1 py-3 rounded-xl font-medium transition-all ${
            activeTab === "upcoming" 
              ? "bg-accent text-white" 
              : "bg-gray-800 text-gray-400"
          }`}
        >
          Upcoming
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center mt-8 text-gray-400">Loading...</div>
      ) : (
        <div className="mt-4">
          {activeTab === "nowShowing" ? (
            <>
              <section className="mt-12">
                <div className="flex justify-between">
                  <h2 className="text-white text-lg font-bold px-4 mb-3">Top Movies</h2>
                  <p className="text-line">See more</p>
                </div>
                <div className="flex overflow-x-auto gap-4 px-4 no-scrollbar">
                  {topMovies.slice(0, 5).map((m) => (
                    <MovieCardVertical key={m.id} movie={m} size="lg" />
                  ))}
                </div>
              </section>

              <section className="mt-10">
                <h2 className="text-white text-lg font-bold px-4 mb-3">Recommended</h2>
                <div className="flex overflow-x-auto gap-4 px-4 no-scrollbar">
                  {recommendedMovies.slice(0, 5).map((m) => (
                    <MovieCardVertical key={m.id} movie={m} />
                  ))}
                </div>
              </section>
            </>
          ) : (
            <section className="mt-4">
              <h2 className="text-white text-lg font-bold px-4 mb-3">Upcoming</h2>
              <div className="flex overflow-x-auto gap-4 px-4 no-scrollbar">
                {upcomingMovies.map((m) => (
                  <MovieCardVertical key={m.id} movie={m} />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}