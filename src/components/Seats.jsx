const Seat = ({ id, status, onToggle }) => {
    const baseStyle = "w-8 h-8 rounded-lg cursor-pointer transition-colors";
    const styles = {
        available: "border-2 border-gray-600 hover:border-gray-400",
        reserved: "bg-red-500 cursor-not-allowed",
        selected: "bg-blue-400",
    }

    return (
        <div 
            className={`${baseStyle} ${styles[status]}`}
            onClick={() => status !== 'reserved' && onToggle(id)}
        />
    )
}

export default Seat;