import { Outlet } from "react-router";
import BottomNav from "./BottomNav";

export default function Layout() {

    return (
        <div className="pb-28 px-4">
            <Outlet />

            <BottomNav />
        </div>
    )
}