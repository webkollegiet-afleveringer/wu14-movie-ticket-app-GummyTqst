import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import SearchTool from './Search';
import ProfileIcon from './ProfileIcon';

import BookmarkIcon from "../assets/svg/bookmark.svg?react";
import SearchIcon from "../assets/svg/search.svg?react";
import { FaChevronLeft } from 'react-icons/fa6';

const Header = ({ 
  title, 
  search, 
  welcome, 
  profile, 
  back, 
  bookmark, 
  bookmarked, 
  onBookmark 
}) => {
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="flex flex-col">
      {/* Top row */}
      <div className="relative flex items-center justify-between p-4 h-16">
        
        {/* Left side */}
        <div>
          {back && (
            <button onClick={() => navigate(-1)}>
              <FaChevronLeft />
            </button>
          )}
          {welcome && (
            <div className="flex flex-col leading-tight">
              <span>Welcome back,</span>
              <span className="font-bold">{welcome}</span>
            </div>
          )}
        </div>

        {/* Center */}
        {title && (
          <h1 className="absolute left-1/2 -translate-x-1/2 font-medium text-xl">
            {title}
          </h1>
        )}

        {/* Right side */}
        <div className="flex gap-2 items-center">
          {bookmark && (
            <button onClick={onBookmark}>
              <BookmarkIcon 
                className={bookmarked ? 'text-accent fill-accent' : 'text-text size-24'} 
              />
            </button>
          )}
          {profile && <ProfileIcon />}
          {search && (
            <button onClick={() => setSearchOpen(prev => !prev)}>
              <SearchIcon />
            </button>
          )}
        </div>
      </div>

      {/* Search bar */}
      {search && searchOpen && <SearchTool />}
    </header>
  );
};

export default Header;