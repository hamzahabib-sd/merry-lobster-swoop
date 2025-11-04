import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { mockRestaurants, Restaurant, MenuItem } from "@/data/mockRestaurants";
import Header from "@/components/Header";
import { Leaf } from "lucide-react"; // Import Leaf icon for the welcome screen

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [calorieRange, setCalorieRange] = useState<number | null>(null);
  const [mileage, setMileage] = useState<number>(3); // Default to 3 miles
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    const userStatus = localStorage.getItem("caloriequest_user_status");
    if (userStatus === "guest" || userStatus === "loggedIn") {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      applyFilters();
    }
  }, [calorieRange, mileage, isLoggedIn]);

  const handleSignIn = () => {
    localStorage.setItem("caloriequest_user_status", "loggedIn");
    setIsLoggedIn(true);
  };

  const handleContinueAsGuest = () => {
    localStorage.setItem("caloriequest_user_status", "guest");
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("caloriequest_user_status");
    setIsLoggedIn(false);
    setCalorieRange(null);
    setFilteredRestaurants([]);
  };

  const applyFilters = () => {
    let tempRestaurants = mockRestaurants.filter(
      (restaurant) => restaurant.distance <= mileage
    );

    if (calorieRange !== null) {
      tempRestaurants = tempRestaurants
        .map((restaurant) => {
          const qualifyingMenu = restaurant.menu.filter(
            (item) => item.calories <= calorieRange
          );
          return { ...restaurant, menu: qualifyingMenu };
        })
        .filter((restaurant) => restaurant.menu.length > 0);
    }

    setFilteredRestaurants(tempRestaurants);
  };

  if (isLoggedIn === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p>Loading...</p>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 to-purple-700 text-white p-4">
        <div className="flex items-center space-x-4 mb-8">
          <Leaf className="h-12 w-12 text-white" />
          <h1 className="text-5xl font-extrabold">CalorieQuest</h1>
        </div>
        <p className="text-xl mb-10 text-center max-w-md font-light">
          Your one-stop companion for healthy dining decisions on the go.
        </p>
        <div className="space-y-4 w-full max-w-xs">
          <Button
            onClick={handleSignIn}
            className="w-full bg-white text-blue-700 hover:bg-gray-100 text-lg py-3 rounded-lg shadow-md"
          >
            Sign in with Google (Simulated)
          </Button>
          <Button
            onClick={handleContinueAsGuest}
            // Removed variant="outline" and explicitly set transparent background
            className="w-full bg-transparent border border-white text-white hover:bg-white/20 text-lg py-3 rounded-lg shadow-md"
          >
            Continue as Guest
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 text-gray-900 dark:text-gray-50 p-4 sm:p-6 lg:p-8">
      <Header onLogout={handleLogout} />

      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 shadow-xl rounded-xl p-6 mb-8 border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-5 text-center text-gray-800 dark:text-gray-100">Find Your Healthy Meal</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <Label htmlFor="calorie-range" className="mb-2 block text-gray-700 dark:text-gray-300 font-medium">Calorie Range</Label>
            <Select
              onValueChange={(value) => setCalorieRange(Number(value))}
              value={calorieRange?.toString() || ""}
            >
              <SelectTrigger id="calorie-range" className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-50">
                <SelectValue placeholder="Select Max Calories" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-50">
                <SelectItem value="600">Under 600 Calories</SelectItem>
                <SelectItem value="1000">Under 1000 Calories</SelectItem>
                <SelectItem value="9999">Any Calories</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="mb-2 block text-gray-700 dark:text-gray-300 font-medium">Distance (Miles)</Label>
            <RadioGroup
              defaultValue="3"
              onValueChange={(value) => setMileage(Number(value))}
              className="flex space-x-4 p-2 bg-gray-50 dark:bg-gray-700 rounded-md border border-gray-300 dark:border-gray-600"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="1" id="r1" className="text-blue-600 dark:text-blue-400" />
                <Label htmlFor="r1" className="text-gray-800 dark:text-gray-50">1 Mile</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="3" id="r2" className="text-blue-600 dark:text-blue-400" />
                <Label htmlFor="r2" className="text-gray-800 dark:text-gray-50">3 Miles</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="5" id="r3" className="text-blue-600 dark:text-blue-400" />
                <Label htmlFor="r3" className="text-gray-800 dark:text-gray-50">5 Miles</Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <Button onClick={applyFilters} className="w-full bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white text-lg py-3 rounded-lg shadow-md">
          Search for Meals
        </Button>
      </div>

      <div className="max-w-2xl mx-auto">
        {filteredRestaurants.length === 0 && calorieRange !== null ? (
          <p className="text-center text-gray-600 dark:text-gray-400 text-lg">
            No restaurants found matching your criteria. Try adjusting your filters!
          </p>
        ) : filteredRestaurants.length === 0 && calorieRange === null ? (
          <p className="text-center text-gray-600 dark:text-gray-400 text-lg">
            Set your calorie range and distance to find nearby healthy meals.
          </p>
        ) : (
          <Accordion type="single" collapsible className="w-full space-y-3">
            {filteredRestaurants.map((restaurant) => (
              <AccordionItem key={restaurant.id} value={restaurant.id} className="border-none">
                <AccordionTrigger className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl shadow-md transition-all duration-200">
                  <span className="font-semibold text-xl text-gray-800 dark:text-gray-100">{restaurant.name}</span>
                  <span className="text-md text-gray-600 dark:text-gray-300">
                    {restaurant.menu.length} items ({restaurant.distance} miles)
                  </span>
                </AccordionTrigger>
                <AccordionContent className="p-4 bg-white dark:bg-gray-800 rounded-b-xl shadow-inner border-t border-gray-100 dark:border-gray-700">
                  <ul className="space-y-3">
                    {restaurant.menu.map((item: MenuItem) => (
                      <li key={item.id} className="flex justify-between items-center border-b border-gray-100 dark:border-gray-700 pb-3 last:border-b-0 last:pb-0">
                        <div>
                          <p className="font-medium text-gray-800 dark:text-gray-100">{item.name}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                        </div>
                        <span className="font-bold text-green-600 dark:text-green-400 text-lg">{item.calories} kcal</span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>
    </div>
  );
};

export default HomePage;