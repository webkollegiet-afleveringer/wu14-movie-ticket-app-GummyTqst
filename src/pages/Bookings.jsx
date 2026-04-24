import { useState, useEffect } from "react";
import { useLoaderData, Link } from "react-router";
import Header from "../components/Header";
import { FaChevronDown } from "react-icons/fa6";

export default function Bookings() {
    const { cinemas, dates, times } = useLoaderData();
    const [savedPlans, setSavedPlans] = useState([]);
    const [expandedIndex, setExpandedIndex] = useState(null);

    useEffect(() => {
        const plans = JSON.parse(localStorage.getItem("saved_plans") || "[]");
        setSavedPlans(plans);
    }, []);

    const deletePlan = (index) => {
        const newPlans = savedPlans.filter((_, i) => i !== index);
        localStorage.setItem("saved_plans", JSON.stringify(newPlans));
        setSavedPlans(newPlans);
        setExpandedIndex(null);
    };

    const updatePlan = (index, field, value) => {
        const newPlans = [...savedPlans];
        newPlans[index][field] = value;
        localStorage.setItem("saved_plans", JSON.stringify(newPlans));
        setSavedPlans(newPlans);
    };

    const toggleExpand = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    const cinemaOptions = cinemas.map(c => c.properties.name);
    const allSeats = [];
    ['A', 'B', 'C', 'D', 'E', 'F'].forEach(row => {
        const seatsInRow = row < 'C' ? 6 : 8;
        for (let i = 1; i <= seatsInRow; i++) allSeats.push(`${row}${i}`);
    });

    return (
        <>
            <Header back title="Saved Plan" />
            <div className="p-4 pb-24">
                {savedPlans.length === 0 ? (
                    <div className="text-center mt-10">
                        <p className="text-gray-400 mb-4">No saved plans yet</p>
                        <Link to="/movies" className="text-accent">Browse Movies</Link>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {savedPlans.map((plan, index) => (
                            <div key={index} className="bg-transparent rounded-2xl overflow-hidden">
                                {/* Movie Card - Click to expand */}
                                <div 
                                    onClick={() => toggleExpand(index)}
                                    className="p-4 flex gap-4"
                                >
                                    <div className="w-20 h-28 bg-gray-700 rounded-lg shrink-0" />
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-white font-bold truncate">{plan.movieName}</h3>
                                        <p className="text-gray-400 text-sm">{plan.location}</p>
                                        <div className="flex gap-4 mt-2 text-gray-400 text-sm">
                                            <span>{plan.date}</span>
                                            <span>{plan.time}</span>
                                        </div>
                                        <div className="flex justify-between items-center mt-2">
                                            <span className="text-gray-400 text-sm">
                                                {plan.persons} person{plan.persons > 1 ? 's' : ''}
                                            </span>
                                            <span className="text-gray-400 text-sm">
                                                {plan.seats?.length || 0} seat{plan.seats?.length !== 1 ? 's' : ''}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Expanded Form */}
                                {expandedIndex === index && (
                                    <div className="px-4 pb-4 border-t border-gray-700">
                                        <div className="mt-4 space-y-4">
                                            <div>
                                                <label className="text-gray-400 text-sm">Cinema</label>
                                                <div className="relative">
                                                    <select
                                                        value={plan.location}
                                                        onChange={(e) => updatePlan(index, 'location', e.target.value)}
                                                        className="w-full bg-gray-700 text-white rounded-xl p-3 mt-1 appearance-none"
                                                    >
                                                        <option value="">Select Cinema</option>
                                                        {cinemaOptions.map(c => (
                                                            <option key={c} value={c}>{c}</option>
                                                        ))}
                                                    </select>
                                                    <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                                </div>
                                            </div>

                                            <div className="flex gap-3">
                                                <div className="flex-1">
                                                    <label className="text-gray-400 text-sm">Date</label>
                                                    <div className="relative">
                                                        <select
                                                            value={plan.date}
                                                            onChange={(e) => updatePlan(index, 'date', e.target.value)}
                                                            className="w-full bg-gray-700 text-white rounded-xl p-3 mt-1 appearance-none"
                                                        >
                                                            <option value="">Select Date</option>
                                                            {dates.map(d => (
                                                                <option key={d} value={d}>{d}</option>
                                                            ))}
                                                        </select>
                                                        <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                                    </div>
                                                </div>
                                                <div className="flex-1">
                                                    <label className="text-gray-400 text-sm">Time</label>
                                                    <div className="relative">
                                                        <select
                                                            value={plan.time}
                                                            onChange={(e) => updatePlan(index, 'time', e.target.value)}
                                                            className="w-full bg-gray-700 text-white rounded-xl p-3 mt-1 appearance-none"
                                                        >
                                                            <option value="">Select Time</option>
                                                            {times.map(t => (
                                                                <option key={t} value={t}>{t}</option>
                                                            ))}
                                                        </select>
                                                        <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <label className="text-gray-400 text-sm">Seats ({plan.seats?.length || 0})</label>
                                                <div className="relative">
                                                    <select
                                                        value=""
                                                        onChange={(e) => {
                                                            if (e.target.value && !(plan.seats || []).includes(e.target.value)) {
                                                                updatePlan(index, 'seats', [...(plan.seats || []), e.target.value]);
                                                            }
                                                        }}
                                                        className="w-full bg-gray-700 text-white rounded-xl p-3 mt-1 appearance-none"
                                                    >
                                                        <option value="">Select Seat</option>
                                                        {allSeats.filter(s => !(plan.seats || []).includes(s)).map(s => (
                                                            <option key={s} value={s}>{s}</option>
                                                        ))}
                                                    </select>
                                                    <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                                </div>
                                                {(plan.seats?.length > 0) && (
                                                    <div className="flex flex-wrap gap-2 mt-2">
                                                        {plan.seats.map(seat => (
                                                            <button
                                                                key={seat}
                                                                onClick={() => updatePlan(index, 'seats', plan.seats.filter(s => s !== seat))}
                                                                className="bg-blue-500 text-white px-2 py-1 rounded-lg text-sm"
                                                            >
                                                                {seat} ×
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex gap-3 mt-4">
                                                <div className="w-20">
                                                    <label className="text-gray-400 text-sm">Persons</label>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <button 
                                                            onClick={() => updatePlan(index, 'persons', Math.max(1, (plan.persons || 1) - 1))}
                                                            className="w-8 h-10 rounded-lg text-accent"
                                                        >
                                                            -
                                                        </button>
                                                        <span className="text-white flex-1 text-center">{plan.persons || 1}</span>
                                                        <button 
                                                            onClick={() => updatePlan(index, 'persons', (plan.persons || 1) + 1)}
                                                            className="w-8 bg-accent rounded-full text-white text-2xl"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex gap-3 mt-4">
                                            <Link 
                                                to={`/movie/${plan.movieId}/select-seats`}
                                                className="flex-1 py-3 bg-accent text-white rounded-xl font-medium text-center"
                                            >
                                                Checkout
                                            </Link>
                                            <button 
                                                onClick={() => deletePlan(index)}
                                                className="w-12 h-12 border-accent border rounded-xl flex items-center justify-center"
                                            >
                                                <svg width="24" height="27" viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                  <path d="M21.2521 8.92951C21.5179 8.92951 21.7591 9.04551 21.9497 9.24151C22.1274 9.45084 22.2169 9.71084 22.1909 9.9855C22.1909 10.0762 21.4803 19.0627 21.0744 22.8454C20.8203 25.1667 19.3238 26.576 17.0792 26.6147C15.3532 26.6533 13.6662 26.6667 12.0051 26.6667C10.2415 26.6667 8.51684 26.6533 6.84275 26.6147C4.67331 26.5627 3.17558 25.128 2.93439 22.8454C2.51684 19.0494 1.81919 10.0762 1.80622 9.9855C1.79326 9.71084 1.88144 9.45084 2.06038 9.24151C2.23674 9.04551 2.4909 8.92951 2.75803 8.92951H21.2521ZM14.753 0C15.9317 0 16.9847 0.822659 17.2894 1.99598L17.5072 2.9693C17.6836 3.76263 18.3709 4.32396 19.1619 4.32396H23.0495C23.5682 4.32396 24 4.75462 24 5.30261V5.80928C24 6.34394 23.5682 6.78793 23.0495 6.78793H0.951805C0.431813 6.78793 0 6.34394 0 5.80928V5.30261C0 4.75462 0.431813 4.32396 0.951805 4.32396H4.83942C5.62913 4.32396 6.3164 3.76263 6.49406 2.97064L6.69764 2.06131C7.01405 0.822658 8.05533 0 9.24703 0H14.753Z" fill="white"/>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}