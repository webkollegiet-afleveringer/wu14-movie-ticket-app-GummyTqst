import { useLoaderData } from "react-router";
import Header from "../components/Header";
import SearchTool from "../components/Search";
import { MovieCardHorizontal } from "../components/MovieCard";

export default function Home() {
  const { upcoming, cinemas } = useLoaderData();

  return (
    <div className="pb-24 font-sans">
      <Header welcome="Miles" profile />
      <div className="mt-4">
        <SearchTool defaultOpen />
      </div>

      <section className="mt-8">
        <h2 className="text-white text-xl font-bold mb-4 px-4">Coming Soon</h2>
        <div className="flex overflow-x-auto gap-4 px-4 no-scrollbar">
          {upcoming.slice(0, 5).map((m) => (
            <MovieCardHorizontal key={m.id} movie={m} />
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-white text-xl font-bold mb-4 px-4">Cinemas Near You</h2>
        {cinemas.length > 0 ? (
          <div className="flex overflow-x-auto gap-4 px-4 no-scrollbar">
            {cinemas.map((cinema) => (
              <div key={cinema.place_id} className="bg-gray-800 p-4 rounded-xl min-w-50">
                <h3 className="text-white font-medium">{cinema.name}</h3>
                <p className="text-gray-400 text-sm mt-1">
                  {cinema.address?.suburb || cinema.city || cinema.address?.city}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 px-4">No cinemas found nearby</p>
        )}
      </section>
    </div>
  );
}
