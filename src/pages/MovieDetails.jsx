import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { API } from "../api/tmdb";
import Header from "../components/Header";

import StarIcon from "../assets/svg/star.svg?react";

export default function MovieDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        API.getMovieDetails(id).then(setMovie);
    }, [id]);

    if (!movie) return <div className="bg-[#0f1115] min-h-screen text-white p-10">Loading...</div>;

    const director = movie.credits?.crew?.find(person => person.job === 'Director');

    const formatRuntime = (minutes) => {
        if (!minutes) return "";
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        
        // Returns "1h 38m" or just "38m" if hours is 0
        return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
    };

    return (
        <>
            <Header back title="Movie details" bookmark />
            <div className="text-white relative px-4">
                
                <img src={API.imgUrl(movie.poster_path)} className="w-full h-full object-cover rounded-lg" />
                <div className="pt-6">
                    <h1 className="text-3xl font-bold">{movie.title}</h1>
                    <div className="flex gap-4 text-gray-400 my-2">
                        {director && (
                            <p className="text-text-secondary text-sm mt-1">
                                Directed: {director.name}
                            </p>
                        )}
                        <hr className="h-6 w-0.5 bg-line border-none" />
                        <span className="flex items-center gap-2">
                            <StarIcon className="size-18" /> 
                            <span className="leading-none">{movie.vote_average.toFixed(1)}</span>
                        </span>
                    </div>

                    {/* Genres */}
                    <div className="flex flex-wrap gap-2 mt-3">
                        {movie.genres?.map((genre) => (
                            <span
                                key={genre.id}
                                className="bg-muted text-sm text-text-secondary px-3 py-1 rounded-lg"
                            >
                                {genre.name}
                            </span>
                        ))}
                        <span className="bg-muted text-sm text-text-secondary px-3 py-1 rounded-lg">
                            {formatRuntime(movie.runtime)}
                        </span>
                    </div>

                    <div className="mt-6">
                        <h2 className="text-text font-semibold text-2xl">Synopsis</h2>
                        <p className="text-gray-300 leading-relaxed mt-2">{movie.overview}</p>
                    </div>
                    <button className="w-full bg-accent py-4 rounded-2xl mt-8 font-bold text-lg" onClick={() => navigate(`/movie/${id}/select-seats`)}>Book Ticket</button>
                </div>
            </div>
        </>
    );
}