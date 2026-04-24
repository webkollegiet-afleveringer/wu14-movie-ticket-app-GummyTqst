import { NavLink } from "react-router";

import HomeIcon from "../assets/svg/home.svg?react";
import ExploreIcon from "../assets/svg/explore.svg?react";
import BookmarkIcon from "../assets/svg/bookmark.svg?react";
import ProfileIcon from "../assets/svg/profile.svg?react";

export default function BottomNav() {
    const navItemClass = ({ isActive }) => 
        `flex justify-center items-center w-10 h-10 transition-all duration-300`;

    return (
        <nav className="fixed bottom-0 left-0 right-0 h-20 z-1000 flex justify-around items-center pb-3 bg-bg rounded-t-2xl shadow-[6px_6px_12px_rgba(0,0,0,0.3)]">
            
            <NavLink to="/" end className={navItemClass}>
                {({ isActive }) => (
                    <HomeIcon className={`w-6 h-6 ${isActive ? 'text-accent' : 'text-text-secondary'}`} />
                )}
            </NavLink>

            <NavLink to="/movies" end className={navItemClass}>
                {({ isActive }) => (
                    <ExploreIcon className={`w-6 h-6 ${isActive ? 'text-accent' : 'text-text-secondary'}`} />
                )}
            </NavLink>

            <NavLink to="/bookings" end className={navItemClass}>
                {({ isActive }) => (
                    <BookmarkIcon className={`w-6 h-6 ${isActive ? 'text-accent' : 'text-text-secondary'}`} />
                )}
            </NavLink>

            <NavLink to="/settings" end className={navItemClass}>
                {({ isActive }) => (
                    <ProfileIcon className={`w-6 h-6 ${isActive ? 'text-accent' : 'text-text-secondary'}`} />
                )}
            </NavLink>
            
        </nav>
    );
}