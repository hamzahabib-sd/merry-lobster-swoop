"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";
import { showSuccess } from "@/utils/toast";

interface HeaderProps {
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  const handleProfileClick = () => {
    showSuccess("Profile feature coming soon!");
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm py-4 px-6 flex items-center justify-between rounded-lg mb-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">CalorieQuest</h1>
      <nav className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" onClick={handleProfileClick} className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
          <User className="h-5 w-5" />
          <span className="sr-only">Profile</span>
        </Button>
        <Button variant="ghost" size="icon" onClick={onLogout} className="text-red-600 hover:bg-red-50 dark:hover:bg-gray-700">
          <LogOut className="h-5 w-5" />
          <span className="sr-only">Logout</span>
        </Button>
      </nav>
    </header>
  );
};

export default Header;