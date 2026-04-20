import ListItem from "../components/ListItem";

// Svg imports
import ActivityIcon from "../assets/svg/activity.svg?react";
import AddUserIcon from "../assets/svg/addUser.svg?react";
import TrashcanIcon from "../assets/svg/trashcan.svg?react";
import NotificationsBellIcon from "../assets/svg/notificationsBell.svg?react";
import TicketIcon from "../assets/svg/ticket.svg?react";
import LogoutIcon from "../assets/svg/logout.svg?react";
import ProfileIcon from "../components/ProfileIcon";
import { FaChevronRight } from "react-icons/fa6";
import Header from "../components/Header";


export default function Settings() {
    return (
      <div>
        <Header back title="Settings" />

        <div className="px-4">
          <button className="flex items-center gap-4 w-full py-3">
            <ProfileIcon />
            <div className="flex-1 flex items-center justify-between text-left">
              <div>
                <p className="text-text font-semibold">Miles Morales</p>
                <p className="text-text-secondary text-sm">Film Hunter</p>
              </div>
              <FaChevronRight size={24} className="text-white" />
            </div>
          </button>


          <div className="border-t border-muted my-2" />

          <h2 className="text-text font-bold text-base mt-4 mb-2">Account</h2>
          <ListItem 
            icon={<ActivityIcon className="size-24 text-white" />}
            label="Personal Data"
            iconBg="#546EE5"
          />
          <ListItem 
            icon={<AddUserIcon className="size-24 text-white" />}
            label="Email & Payment"
            iconBg="#54C2E5"
          />
          <ListItem 
            icon={<TrashcanIcon className="size-24 text-white" />}
            label="Deactive Account"
            iconBg="#E55454"
          />

          <div className="border-t border-muted my-2" />

          <h2 className="text-text font-bold text-base mt-4 mb-2">Privacy & Policy</h2>
          <ListItem 
            icon={<NotificationsBellIcon className="size-24 text-white" />}
            label="Notification"
            iconBg="#546EE5"
          />
          <ListItem 
            icon={<TicketIcon className="size-24 text-white" />}
            label="Your Ticket"
            iconBg="#54C2E5"
          />
          <ListItem 
            icon={<LogoutIcon className="size-24 text-white" />}
            label="Logout"
            iconBg="#E55454"
          />

        </div>
      </div>
    )
  }