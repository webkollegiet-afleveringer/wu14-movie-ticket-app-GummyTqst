import { useState } from "react";
import { useLoaderData } from "react-router";
import Header from "../components/Header";
import { MovieCardVertical } from "../components/MovieCard";

export default function Explore() {
  const { trending, recommended, upcoming } = useLoaderData();
  const [activeTab, setActiveTab] = useState("nowShowing");

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

      <div className="mt-4">
        {activeTab === "nowShowing" ? (
          <>
            <section className="mt-12">
              <div className="flex justify-between">
                <h2 className="text-white text-lg font-bold px-4 mb-3">Top Movies</h2>
                <p className="text-line">See more</p>
              </div>
              <div className="flex overflow-x-auto gap-4 px-4 no-scrollbar">
                {trending.slice(0, 5).map((m) => (
                  <MovieCardVertical key={m.id} movie={m} size="lg" />
                ))}
              </div>
            </section>

            <section className="mt-10">
              <h2 className="text-white text-lg font-bold px-4 mb-3">Recommended</h2>
              <div className="flex overflow-x-auto gap-4 px-4 no-scrollbar">
                {recommended.slice(0, 5).map((m) => (
                  <MovieCardVertical key={m.id} movie={m} />
                ))}
              </div>
            </section>
          </>
        ) : (
          <section className="mt-4">
            <h2 className="text-white text-lg font-bold px-4 mb-3">Upcoming</h2>
            <div className="flex overflow-x-auto gap-4 px-4 no-scrollbar">
              {upcoming.map((m) => (
                <MovieCardVertical key={m.id} movie={m} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}