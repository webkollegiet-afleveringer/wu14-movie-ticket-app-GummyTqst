import { Link } from "react-router";
import Avatar from "../assets/avatar.png";

export default function ProfileIcon(){
    return (
        <div className="w-12 h-12 rounded-lg overflow-hidden">
            <Link to={"/settings"}>
                <img src={Avatar} alt="Picture of avatar" />
            </Link>
        </div>
    )
}