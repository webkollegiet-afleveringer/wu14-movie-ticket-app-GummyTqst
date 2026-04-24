import { FaChevronRight } from "react-icons/fa6"
import { useNavigate } from "react-router"

const ListItem = ({ icon, label, iconBg, onClick, navigateTo = "/" }) => {
    const navigate = useNavigate()

    const handleAction = () => {
        if (onClick) {
            onClick()
        }
        navigate(navigateTo)
    }

    return (
        <button
            onClick={handleAction}
            className="flex items-center gap-4 w-full py-3"
        >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: iconBg || 'var(--color-accent)' }}>
                {icon}
            </div>
            <span className="text-text font-medium flex-1 text-left">{label}</span>
            <FaChevronRight size={24} className="text-white" />

        </button>
    )
}

export default ListItem