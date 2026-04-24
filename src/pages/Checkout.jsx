import { useState, useEffect } from "react"
import { useParams, useNavigate, useSearchParams } from "react-router"
import Header from "../components/Header"
import Popup from "../components/Popup"
import { API } from "../api/tmdb"

const TICKET_PRICE = 12

export default function Checkout() {
    const { id: movieId } = useParams()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const [selectedSeats, setSelectedSeats] = useState([])
    const [loading, setLoading] = useState(true)
    const [movie, setMovie] = useState(null)

    const [card, setCard] = useState({ number: '', name: '', expiry: '', cvv: '' })
    const [isFlipped, setIsFlipped] = useState(false)
    const [showPopup, setShowPopup] = useState(false)
    const [bookingDetails, setBookingDetails] = useState({ 
        date: searchParams.get("date") || "Select date", 
        time: searchParams.get("time") || "Select time",
        location: searchParams.get("cinema") || "Select cinema"
    })

    const formatCardDisplay = (num) => {
        const padded = num.padEnd(16, '*');
        const masked = padded.slice(0, 12).replace(/./g, '*') + padded.slice(12);
        return masked.replace(/(.{4})/g, '$1 ').trim();
    };
    const displayNum = formatCardDisplay(card.number);

    useEffect(() => {
        const seats = JSON.parse(localStorage.getItem(`selected_${movieId}`) || "[]")
        setSelectedSeats(seats)
        API.getMovieDetails(movieId).then(setMovie);
        setLoading(false)
    }, [movieId])

    const total = selectedSeats.length * TICKET_PRICE

    const handlePay = () => {
        setShowPopup(true)
    }

    const handleSuccessClose = () => {
        setShowPopup(false)
        
        try {
            const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
            const existingIndex = bookings.findIndex(b => b.movieId === movieId);
            const generateOrderNumber = () => Math.floor(10000000 + Math.random() * 90000000).toString();
            
            if (existingIndex >= 0) {
                const existingBooking = bookings[existingIndex];
                const existingSeats = existingBooking.seats || [];
                const newSeats = [...new Set([...existingSeats, ...selectedSeats])];
                bookings[existingIndex] = {
                    ...existingBooking,
                    seats: newSeats,
                    orderNumber: existingBooking.orderNumber || generateOrderNumber()
                };
            } else {
                bookings.push({
                    movieId,
                    movieName: movie?.title || "Movie",
                    seats: selectedSeats,
                    date: bookingDetails.date,
                    time: bookingDetails.time,
                    location: bookingDetails.location,
                    orderNumber: generateOrderNumber()
                });
            }
            
            localStorage.setItem("bookings", JSON.stringify(bookings));
        } catch (error) {
            console.error("Error saving bookings:", error);
        }
        
        localStorage.removeItem(`selected_${movieId}`)
        
        navigate(`/tickets`)
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
        <> 
            <Header back title="Checkout" />
            <div className="p-4">
                <div className="group h-44 w-80 max-w-sm perspective-[1000px] mb-20">
                    <div>
                        <h2 className="text-xl font-bold text-text mb-4">Payment Method</h2>
                    </div>

                    <div className={`relative h-full w-full rounded-2xl transition-all duration-500 transform-3d ${isFlipped ? 'transform-[rotateY(180deg)]' : ''}`}>
                    
                        {/* Front */}
                        <div className="absolute inset-0 h-full w-full rounded-2xl bg-linear-to-br from-blue-600 to-blue-400 p-6 backface-hidden">
                            <header className="flex justify-between items-start mb-12">
                                <div className="flex gap-2">
                                    <div className="w-10 h-7 bg-orange-400 rounded-sm opacity-80" />
                                    <div className="w-10 h-7 bg-pink-400 rounded-sm opacity-80" />
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] uppercase opacity-60">Balance</p>
                                    <p className="text-xl font-bold">$120,580,00</p>
                                </div>
                            </header>
                            <footer className="flex justify-between items-end mt-auto">
                                <div className="w-[30%]">
                                    <p className="text-[10px] uppercase opacity-60">Card Holder</p>
                                    <p className="uppercase tracking-wider text-xs">{card.name || 'MILES MORALES'}</p>
                                </div>
                                <div className="w-[70%] text-right">
                                    <p className="uppercase tracking-wider font-mono text-sm">{displayNum}</p>
                                </div>
                            </footer>
                        </div>

                        {/* Back */}
                        <div className="absolute inset-0 h-full w-full rounded-2xl bg-slate-800 transform-[rotateY(180deg)] backface-hidden flex flex-col justify-around py-4">
                            <div className="h-10 w-full bg-black" />
                            <div className="px-6 text-right">
                                <div className="bg-white text-black px-2 py-1 rounded italic font-bold">
                                    {card.cvv ? '***' + card.cvv.slice(-4) : '****'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Form Area */}
                <h2 className="text-xl font-bold text-text mb-4">Payment Details</h2>
                <form className="w-full max-w-sm space-y-4">
                    <div>
                        <label>Cardholder Name</label>
                        <input
                            type="text"
                            placeholder="Cardholder name"
                            maxLength={15}
                            className="w-full bg-transparent border border-line rounded-xl p-3 outline-none focus:border-blue-500"
                            onChange={e => setCard({...card, name: e.target.value})}
                        />
                    </div>

                    <div>
                        <label>Card Number</label>
                        <input 
                            type="text"
                            placeholder="Card number"
                            maxLength="16"
                            className="w-full bg-transparent border border-line rounded-xl p-3 outline-none focus:border-blue-500"
                            onChange={e => setCard({...card, number: e.target.value})}
                        />
                    </div>

                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label>Date</label>
                            <input 
                                type="date"
                                placeholder="MM/YY"
                                maxLength="5"
                                className="w-full bg-transparent border border-line rounded-xl p-3 outline-none focus:border-blue-500"
                            />
                        </div>
                        <div className="flex-1">
                            <label>CVV</label>
                            <input 
                                type="text"
                                placeholder="CVV" 
                                maxLength="4"
                                className="w-full bg-transparent border border-line rounded-xl p-3 outline-none focus:border-blue-500"
                                onFocus={() => setIsFlipped(true)}
                                onBlur={() => setIsFlipped(false)}
                                onChange={e => setCard({...card, cvv: e.target.value})}
                            />
                        </div>
                    </div>

                    <button 
                        type="button"
                        onClick={handlePay}
                        className="w-full py-4 bg-accent text-white rounded-xl font-medium"
                    >
                        Pay Now | ${total}
                    </button>

                    {showPopup && (
                        <Popup 
                            isOpen={showPopup} 
                            onClose={handleSuccessClose}
                            title="Your payment was successful"
                            message="Your tickets have been booked successfully!"
                            buttonText="See E-Ticket"
                            navigateTo="/tickets"
                        >
                        </Popup>
                    )}
                </form>
            </div>
        </>
    )
}