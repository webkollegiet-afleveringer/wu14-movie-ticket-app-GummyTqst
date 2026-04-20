import { useEffect, useState } from "react";
import Header from "../components/Header";
import SearchTool from "../components/Search";
import { MovieCardVertical, MovieCardHorizontal } from "../components/MovieCard";
import { API } from "../api/tmdb";

export default function Home() {
  const [comingSoon, setComingSoon] = useState([]);
  const [nowShowing, setNowShowing] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const upcoming = await API.getUpcoming();
        console.log("Upcoming movies:", upcoming);
        const showing = await API.getNowShowing();
        setComingSoon(upcoming || []);
        setNowShowing(showing || []);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center text-white">Loading...</div>;
  }

  return (
    <div className="pb-24 font-sans">
      <Header welcome="Miles" profile />
      <div className="mt-4">
        <SearchTool defaultOpen />
      </div>

      <section className="mt-8">
        <h2 className="text-white text-xl font-bold mb-4 px-4">Coming Soon</h2>
        <div className="flex overflow-x-auto gap-4 px-4 no-scrollbar">
          {comingSoon.slice(0, 5).map((m) => (
            <MovieCardHorizontal key={m.id} movie={m} />
          ))}
        </div>
      </section>

      {/* <section className="mt-8">
        <div className="flex justify-between items-center mb-4 px-4">
          <h2 className="text-white text-xl font-bold">Now Showing</h2>
          <span className="text-gray-500 text-sm">See all</span>
        </div>
        <div className="flex overflow-x-auto gap-4 px-4 no-scrollbar">
          {nowShowing?.map((m) => (
            <MovieCardVertical key={m.id} movie={m} />
          ))}
        </div>
      </section> */}
    </div>
  );
}