import { useLoaderData } from "react-router";
import Header from "../components/Header";
import SearchTool from "../components/Search";
import { MovieCardHorizontal } from "../components/MovieCard";

export default function Home() {
  const { upcoming } = useLoaderData();

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
    </div>
  );
}
