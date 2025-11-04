"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { LogOut, User, Leaf } from "lucide-react";
import { showSuccess } from "@/utils/toast";
import { NavLink } from "react-router-dom";

interface HeaderProps {
  onLogout: () => void;
  userStatus: string | null;
}

const Header: React.FC<HeaderProps> = ({ onLogout, userStatus }) => {
  const handleProfileClick = () => {
    showSuccess("Profile feature coming soon!");
  };

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-blue-600 to-green-500 text-white shadow-lg py-4 px-6 flex items-center justify-between rounded-xl">
      <div className="flex items-center space-x-2">
        <Leaf className="h-7 w-7 text-white" />
        <h1 className="text-3xl font-bold">CalorieQuest</h1>
      </div>
      {userStatus && ( // Only show navigation and user actions if userStatus is set
        <nav className="flex items-center space-x-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-3 py-2 rounded-md text-lg font-medium transition-colors ${
                isActive ? "bg-white/30" : "hover:bg-white/20"
              } text-white`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/find-meal"
            className={({ isActive }) =>
              `px-3 py-2 rounded-md text-lg font-medium transition-colors ${
                isActive ? "bg-white/30" : "hover:bg-white/20"
              } text-white`
            }
          >
            Find Meal
          </NavLink>
          <Button variant="ghost" size="icon" onClick={handleProfileClick} className="text-white hover:bg-white/20">
            <User className="h-5 w-5" />
            <span className="sr-only">Profile</span>
          </Button>
          <Button variant="ghost" size="icon" onClick={onLogout} className="text-white hover:bg-white/20">
            <LogOut className="h-5 w-5" />
            <span className="sr-only">Logout</span>
          </Button>
        </nav>
      )}
    </header>
  );
};

export default Header;