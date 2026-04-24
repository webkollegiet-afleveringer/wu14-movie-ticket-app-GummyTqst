import { useState, useEffect } from "react"
import { useParams, useNavigate, useLoaderData } from "react-router"

import screenSvg from "../assets/svg/screen.svg"
import Seat from "../components/Seats"
import Header from "../components/Header"
import { FaChevronDown } from "react-icons/fa6"

export default function SeatSelector(){
    const { id: movieId } = useParams()
    const navigate = useNavigate()
    const [selectedSeats, setSelectedSeats] = useState([])
    const [selectedDate, setSelectedDate] = useState("")
    const [selectedTime, setSelectedTime] = useState("")
    const [selectedCinema, setSelectedCinema] = useState("")
    const [persons, setPersons] = useState(1)
    const { cinemas, movie } = useLoaderData()

    const seatLayout = [
        { row: 'A', left: 3, right: 3 },
        { row: 'B', left: 4, right: 4 },
        { row: 'C', left: 4, right: 4 },
        { row: 'D', left: 4, right: 4 },
        { row: 'E', left: 4, right: 4 },
        { row: 'F', left: 3, right: 3 },
    ]

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem(`selected_${movieId}`) || "[]")
        const plans = JSON.parse(localStorage.getItem("saved_plans") || "[]");
        const savedPlan = plans.find(p => p.movieId === movieId);
        
        if (savedPlan) {
            setSelectedSeats(savedPlan.seats || []);
            setSelectedDate(savedPlan.date || "");
            setSelectedTime(savedPlan.time || "");
            setSelectedCinema(savedPlan.location || "");
            setPersons(savedPlan.persons || 1);
        } else if (saved.length > 0) {
            setSelectedSeats(saved);
        }
    }, [movieId])

    const handleToggle = (seatId) => {
        setSelectedSeats(prev => {
            const newSeats = prev.includes(seatId) 
                ? prev.filter(s => s !== seatId) 
                : [...prev, seatId]
            localStorage.setItem(`selected_${movieId}`, JSON.stringify(newSeats))
            return newSeats
        })
    }

    const handleSavePlan = () => {
        const plans = JSON.parse(localStorage.getItem("saved_plans") || "[]");
        const existingIndex = plans.findIndex(p => p.movieId === movieId);
        const plan = {
            movieId,
            movieName: movie?.title || "Movie",
            location: selectedCinema || "Cinema",
            date: selectedDate || "Select date",
            time: selectedTime || "Select time",
            seats: selectedSeats,
            persons: persons
        };
        
        if (existingIndex >= 0) {
            plans[existingIndex] = plan;
        } else {
            plans.push(plan);
        }
        
        localStorage.setItem("saved_plans", JSON.stringify(plans));
        navigate(`/bookings`);
    }

    const handleCheckout = () => {
        if (selectedSeats.length === 0) return
        if (!selectedDate || !selectedTime) {
            alert("Please select both date and time");
            return;
        }
        const params = new URLSearchParams({ date: selectedDate, time: selectedTime, cinema: selectedCinema });
        navigate(`/movie/${movieId}/checkout?${params.toString()}`)
    }

    const reserved = JSON.parse(localStorage.getItem("reserved_seats") || "{}")
    const reservedSeats = reserved[movieId] || []

    // Gets date today and 6 days after, formats as "DD MMM YYYY"
    const dates = Array.from({ length: 7 }, (_, i) => {
        const date = new Date()
        date.setDate(date.getDate() + i)
        return date.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })
    })

    const times = ["10.00 AM", "01.00 PM", "04.00 PM", "07.00 PM", "10.00 PM"]

    return (
        <>
            <Header back title="Select Seats" />
            <div className="px-4 pt-0">
                <section className="mt-8 px-4 flex flex-col gap-6">
                    <div>
                        <label className="block text-lg mb-3">Cinema</label>
                        <div className="relative">
                            <select 
                                className="w-full bg-transparent border border-line rounded-2xl p-4 appearance-none focus:outline-none text-text-secondary"
                                value={selectedCinema}
                                onChange={e => setSelectedCinema(e.target.value)}
                            >   
                                <option value="">Select Cinema</option>
                                {cinemas.length > 0 ? (
                                    cinemas.map((cinema) => (
                                        <option key={cinema.properties.place_id} value={cinema.properties.name}>
                                            {cinema.properties.name}
                                        </option>
                                    ))
                                ) : (
                                    <option value="">No cinemas found</option>
                                )}
                            </select>
                            <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                    </div>

                    <div className="flex gap-4">
                        {/* Date */}
                        <div className="flex-1">
                            <label className="block text-lg mb-3">Date</label>
                            <div className="relative">
                                <select 
                                    className="w-full bg-transparent border border-line rounded-2xl p-4 appearance-none focus:outline-none text-text-secondary"
                                    value={selectedDate}
                                    onChange={e => setSelectedDate(e.target.value)}
                                >
                                    <option value="">Select date</option>
                                    {dates.map((date) => (
                                        <option key={date} value={date}>{date}</option>
                                    ))}
                                </select>
                                <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>
                        </div>

                        {/* Time */}
                        <div className="flex-1">
                            <label className="block text-lg mb-3">Time</label>
                            <div className="relative">
                                <select 
                                    className="w-full bg-transparent border border-line rounded-2xl p-4 appearance-none focus:outline-none text-text-secondary"
                                    value={selectedTime}
                                    onChange={e => setSelectedTime(e.target.value)}
                                >
                                    <option value="">Select time</option>
                                    {times.map((time) => (
                                        <option key={time} value={time}>{time}</option>
                                    ))}
                                </select>
                                <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    {/* <div className="mt-4">
                        <label className="block text-lg mb-3">Persons</label>
                        <div className="flex items-center gap-4">
                            <button 
                                onClick={() => setPersons(Math.max(1, persons - 1))}
                                className="w-10 h-10 bg-gray-700 rounded-full text-white text-xl"
                            >
                                -
                            </button>
                            <span className="text-white text-xl w-8 text-center">{persons}</span>
                            <button 
                                onClick={() => setPersons(persons + 1)}
                                className="w-10 h-10 bg-gray-700 rounded-full text-white text-xl"
                            >
                                +
                            </button>
                        </div>
                    </div> */}
                </section>
                
                <div className="py-8 pb-0 flex flex-col items-center">
                    <img src={screenSvg} alt="Cinema screen" className="w-full" />
                </div>

                {/* Seat Grid */}
                <div className="flex flex-col items-center gap-4 mb-10">
                    {seatLayout.map(({ row, left, right }) => (
                        <div key={row} className="flex items-center gap-2">
                            <div className="flex gap-2">
                                {Array.from({ length: left }, (_, i) => {
                                    const seatId = `${row}${i + 1}`
                                    let status = "available"
                                    if (reservedSeats.includes(seatId)) status = 'reserved'
                                    else if (selectedSeats.includes(seatId)) status = 'selected'
                                    return (
                                        <Seat 
                                            key={seatId} 
                                            id={seatId} 
                                            status={status} 
                                            onToggle={handleToggle}
                                        />
                                    )
                                })}
                            </div>
                            <div className="w-8" />
                            <div className="flex gap-2">
                                {Array.from({ length: right }, (_, i) => {
                                    const seatId = `${row}${left + i + 1}`
                                    let status = "available"
                                    if (reservedSeats.includes(seatId)) status = 'reserved'
                                    else if (selectedSeats.includes(seatId)) status = 'selected'
                                    return (
                                        <Seat 
                                            key={seatId} 
                                            id={seatId} 
                                            status={status} 
                                            onToggle={handleToggle}
                                        />
                                    )
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Legend */}
                <div className="flex justify-center gap-6 mb-6">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-gray-700" />
                        <span className="text-gray-400 text-sm">Available</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500" />
                        <span className="text-gray-400 text-sm">Selected</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <span className="text-gray-400 text-sm">Reserved</span>
                    </div>
                </div>

                {selectedSeats.length > 0 && (
                    <div className="pb-28 space-y-3">
                        <button 
                            onClick={handleSavePlan}
                            className="w-full py-4 bg-gray-700 text-white rounded-xl font-medium"
                        >
                            Save Plan
                        </button>
                        <button 
                            onClick={handleCheckout}
                            className="w-full py-4 bg-accent text-white rounded-xl font-medium"
                        >
                            Confirm ({selectedSeats.length} seat{selectedSeats.length > 1 ? 's' : ''})
                        </button>
                    </div>
                )}
            </div>
        </>
    )
}