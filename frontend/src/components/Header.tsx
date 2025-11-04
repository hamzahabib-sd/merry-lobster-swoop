"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { LogOut, User, Leaf } from "lucide-react"; // Import Leaf icon
import { showSuccess } from "@/utils/toast";

interface HeaderProps {
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  const handleProfileClick = () => {
    showSuccess("Profile feature coming soon!");
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-green-500 text-white shadow-lg py-4 px-6 flex items-center justify-between rounded-xl mb-8">
      <div className="flex items-center space-x-2">
        <Leaf className="h-7 w-7 text-white" /> {/* Logo icon */}
        <h1 className="text-3xl font-bold">CalorieQuest</h1>
      </div>
      <nav className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" onClick={handleProfileClick} className="text-white hover:bg-white/20">
          <User className="h-5 w-5" />
          <span className="sr-only">Profile</span>
        </Button>
        <Button variant="ghost" size="icon" onClick={onLogout} className="text-white hover:bg-white/20">
          <LogOut className="h-5 w-5" />
          <span className="sr-only">Logout</span>
        </Button>
      </nav>
    </header>
  );
};

export default Header;