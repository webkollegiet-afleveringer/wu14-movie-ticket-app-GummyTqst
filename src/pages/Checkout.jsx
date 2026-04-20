import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router"

const TICKET_PRICE = 12

export default function Checkout() {
    const { id: movieId } = useParams()
    const navigate = useNavigate()
    const [selectedSeats, setSelectedSeats] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const seats = JSON.parse(localStorage.getItem(`selected_${movieId}`) || "[]")
        setSelectedSeats(seats)
        setLoading(false)
    }, [movieId])

    const total = selectedSeats.length * TICKET_PRICE

    const handlePay = () => {
        const reserved = JSON.parse(localStorage.getItem("reserved_seats") || "{}")
        if (!reserved[movieId]) {
            reserved[movieId] = []
        }
        reserved[movieId] = [...reserved[movieId], ...selectedSeats]
        localStorage.setItem("reserved_seats", JSON.stringify(reserved))
        
        localStorage.removeItem(`selected_${movieId}`)
        
        navigate(`/movie/${movieId}/seats`)
    }

    if (loading) return null

    if (selectedSeats.length === 0) {
        return (
            <div className="p-4">
                <p className="text-gray-400">No seats selected</p>
            </div>
        )
    }

    return (
        <div className="p-4">
            <h1 className="text-white text-xl font-bold mb-6">Checkout</h1>
            
            <div className="bg-gray-800 rounded-xl p-4 mb-6">
                <h2 className="text-gray-400 text-sm mb-2">Selected Seats</h2>
                <div className="flex flex-wrap gap-2">
                    {selectedSeats.map(seat => (
                        <span key={seat} className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                            {seat}
                        </span>
                    ))}
                </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-4 mb-6">
                <div className="flex justify-between text-white mb-2">
                    <span>Tickets x{selectedSeats.length}</span>
                    <span>${selectedSeats.length * TICKET_PRICE}</span>
                </div>
                <div className="flex justify-between text-gray-400 text-sm">
                    <span>Price per ticket</span>
                    <span>${TICKET_PRICE}</span>
                </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-4 mb-6">
                <div className="flex justify-between text-white font-bold">
                    <span>Total</span>
                    <span>${total}</span>
                </div>
            </div>

            <button 
                onClick={handlePay}
                className="w-full py-4 bg-active text-white rounded-xl font-medium"
            >
                Pay Now | ${total}
            </button>
        </div>
    )
}