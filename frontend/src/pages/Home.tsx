"use client";

import React from "react";
import { MadeWithDyad } from "@/components/made-with-dyad";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50 flex flex-col">
      <header className="bg-white dark:bg-gray-800 shadow-sm p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-green-600 dark:text-green-400">CalorieQuest</h1>
        {/* Placeholder for user profile/settings */}
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600 dark:text-gray-300">Guest User</span>
          {/* Future: Avatar, Settings button */}
        </div>
      </header>

      <main className="flex-grow container mx-auto p-4">
        <h2 className="text-xl font-semibold mb-4">Find Healthy Meals Near You</h2>
        {/* Placeholder for CalorieFilter and RestaurantList components */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <p className="text-gray-700 dark:text-gray-300">
            Filters and restaurant results will appear here.
          </p>
        </div>
      </main>

      <MadeWithDyad />
    </div>
  );
};

export default Home;