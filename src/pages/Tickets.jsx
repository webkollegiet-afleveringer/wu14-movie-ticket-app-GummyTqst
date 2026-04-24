import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Header from "../components/Header";
import Popup from "../components/Popup";

export default function Tickets() {
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const storedBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
        setBookings(storedBookings);
    }, []);

    const handleDownload = () => {
        setShowPopup(true);
    };

    if (bookings.length === 0) {
        return (
            <>
                <Header back title="E-Ticket" />
                <div className="p-4">
                    <p className="text-gray-400">No tickets found</p>
                </div>
            </>
        );
    }

    return (
        <>
            <Header back title="E-Ticket" />
            <div className="p-4">
                <div>
                    <h1 className="text-white text-2xl mb-4">Instruction</h1>
                    <p className="text-gray-400">
                        Come to the cinema, show and scan the barcode to the space provided. Continue to comply with health protocols.
                    </p>
                </div>

                {/* Tickets for each movie */}
                <div className="mt-6 flex overflow-x-auto gap-4 no-scrollbar">
                    {bookings.map((booking, index) => {
                        const seatString = booking.seats.join(", ");
                        return (
                            <div key={index} className="relative bg-white rounded-3xl p-6 w-[93%] max-w-md shrink-0 text-black">
                                <div className="flex justify-between items-start mb-6">
                                    <h2 className="text-xl font-bold">Film: {booking.movieName}</h2>
                                    <span className="text-red-400 font-medium">e-ticket</span>
                                </div>

                                <div className="grid grid-cols-2 gap-y-6 gap-x-16 mb-8">
                                    <div>
                                        <p className="text-gray-400 mb-1">Date</p>
                                        <p className="text-black">{booking.date}</p>
                                    </div>

                                    <div>
                                        <p className="text-gray-400 mb-1">Seats ({booking.seats.length})</p>
                                        <p className="text-black font-bold">{seatString}</p>
                                    </div>

                                    <div>
                                        <p className="text-gray-400 mb-1">Location</p>
                                        <p className="text-black">{booking.location}</p>
                                    </div>

                                    <div>
                                        <p className="text-gray-400 mb-1">Time</p>
                                        <p className="text-black">{booking.time}</p>
                                    </div>

                                    <div>
                                        <p className="text-gray-400 text-sm mb-1">Payment</p>
                                        <p className="font-bold">Successful</p>
                                    </div>

                                    <div>
                                        <p className="text-gray-400 mb-1">Order</p>
                                        <p className="text-black">{booking.orderNumber}</p>
                                    </div>
                                </div>

                                <div className="relative border-t-2 border-dashed border-gray-200 pt-8 mt-4">
                                    {/* Barcode Placeholder */}
                                    <div className="flex flex-col items-center">
                                        <div className="flex gap-1 h-16 w-full justify-center">
                                            {Array.from({ length: 40 }).map((_, i) => (
                                                <div 
                                                    key={i} 
                                                    className={`bg-black ${i % 3 === 0 ? 'w-1' : 'w-0.5'} ${i % 5 === 0 ? 'h-full' : 'h-14'}`} 
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <button
                    type="button"
                    onClick={handleDownload}
                    className="w-full py-4 bg-accent text-white rounded-xl font-medium mt-6"
                >
                    Download E-Ticket
                </button>

                {showPopup && (
                    <Popup
                        isOpen={showPopup} 
                        onClose={() => {
                            setShowPopup(false);
                            navigate("/");
                        }}
                        title="Your ticket has been downloaded"
                        message="Your tickets have been booked successfully!"
                        buttonText="Back to Home"
                        icon={(
                            <svg width="40" height="47" viewBox="0 0 40 47" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22.7558 0C23.3333 0 23.8185 0.49 23.8185 1.07333V8.58667C23.8185 12.8567 27.2838 16.3567 31.5347 16.38C33.2673 16.38 34.6766 16.4033 35.7162 16.4033L36.1098 16.4016C36.82 16.3962 37.7761 16.38 38.604 16.38C39.2046 16.38 39.6667 16.8467 39.6667 17.43V36.19C39.6667 41.9767 35 46.6667 29.2706 46.6667H10.9043C4.87459 46.6667 0 41.7433 0 35.6767V10.5233C0 4.73667 4.64356 0 10.4191 0H22.7558ZM18.9901 15.7267C18.0429 15.7267 17.2574 16.4967 17.2574 17.4767V28.7233L13.5842 24.99C12.9142 24.3133 11.8284 24.3133 11.1584 24.99C10.4885 25.6667 10.4885 26.7633 11.1584 27.4633L17.7657 34.16C17.9274 34.3233 18.1122 34.44 18.3201 34.5333C18.5281 34.6267 18.7591 34.6733 18.9901 34.6733C19.2211 34.6733 19.429 34.6267 19.637 34.5333C19.8449 34.44 20.0297 34.3233 20.1914 34.16L26.8218 27.4633C27.4918 26.7633 27.4918 25.6667 26.7987 24.99C26.1287 24.3133 25.0429 24.3133 24.3729 24.99L20.6997 28.7233V17.4767C20.6997 16.4967 19.9373 15.7267 18.9901 15.7267ZM27.1718 2.11423C27.1718 1.10857 28.38 0.609233 29.0685 1.3349C31.5682 3.95757 35.9322 8.54257 38.3718 11.1046C39.0464 11.8116 38.552 12.9852 37.5771 12.9876C35.6804 12.9946 33.4418 12.9876 31.8315 12.9712C29.2764 12.9712 27.1718 10.8456 27.1718 8.2649V2.11423Z" fill="white"/>
                            </svg>
                        )}
                    />
                )}
            </div>
        </>
    );
}