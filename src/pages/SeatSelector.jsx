import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router"

import screenSvg from "../assets/svg/screen.svg"
import blueLineSvg from "../assets/svg/blueScreenLine.svg"
import Seat from "../components/Seats"
import Header from "../components/Header"

export default function SeatSelector(){
    const { id: movieId } = useParams()
    const navigate = useNavigate()
    const [selectedSeats, setSelectedSeats] = useState([])

    const seatLayout = [
        { row: 'A', left: 3, right: 3 },
        { row: 'B', left: 4, right: 4 },
        { row: 'C', left: 4, right: 4 },
        { row: 'D', left: 4, right: 4 },
        { row: 'E', left: 4, right: 4 },
        { row: 'F', left: 3, right: 3 },
    ]

    useEffect(() => {
        const reserved = JSON.parse(localStorage.getItem("reserved_seats") || "{}")
        const saved = JSON.parse(localStorage.getItem(`selected_${movieId}`) || "[]")
        setSelectedSeats(saved)
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

    const handleCheckout = () => {
        if (selectedSeats.length === 0) return
        navigate(`/movie/${movieId}/checkout`)
    }

    const reserved = JSON.parse(localStorage.getItem("reserved_seats") || "{}")
    const reservedSeats = reserved[movieId] || []

    return (
        <>
            <Header back title="Select Seats" />
            <div className="px-4">
                <div className="py-8 flex flex-col items-center relative">
                    <img src={blueLineSvg} alt="Screen line" className="absolute top w-65" />
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
                        <div className="w-6 h-6 rounded bg-gray-700" />
                        <span className="text-gray-400 text-sm">Available</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-blue-500" />
                        <span className="text-gray-400 text-sm">Selected</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-red-500" />
                        <span className="text-gray-400 text-sm">Reserved</span>
                    </div>
                </div>

                {selectedSeats.length > 0 && (
                    <div className="fixed bottom-24 left-4 right-4">
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