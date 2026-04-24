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
          <div className="flex flex-col gap-3 px-4">
            {cinemas.map((cinema) => {
              const info = cinema.properties;
              const distanceKm = info.distance ? (info.distance / 1000).toFixed(2) : "?.?";
              
              return (
                <div key={info.place_id} className="flex items-center rounded-2xl">
                  <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center p-2 shrink-0">
                    <span className="text-black font-black text-xs text-center leading-tight">
                      {info.name?.split(' ')[0].toUpperCase() || "CINE"}
                      <br />
                      <span className="text-[8px] font-normal">CINEMAS</span>
                    </span>
                  </div>

                  <div className="ml-4 grow">
                    <div className="flex items-center text-blue-400 text-sm mb-1">
                      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                      </svg>
                      {distanceKm.replace('.', ',')} Kilometers
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-bold truncate pr-2">
                        {info.name || "Unknown Cinema"}
                      </h3>
                      <div className="flex items-center text-gray-400 text-sm">
                        <span className="text-orange-400 mr-1">★</span> 4,9
                      </div>
                    </div>

                    <p className="text-gray-400 text-sm">
                      Closed 10.00 PM
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-400 px-4">No cinemas found nearby</p>
        )}
      </section>
    </div>
  );
}
