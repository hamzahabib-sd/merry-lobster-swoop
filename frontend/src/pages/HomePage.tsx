import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { mockRestaurants, Restaurant, MenuItem } from "@/data/mockRestaurants";
import { MadeWithDyad } from "@/components/made-with-dyad";

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [calorieRange, setCalorieRange] = useState<number | null>(null);
  const [mileage, setMileage] = useState<number>(3); // Default to 3 miles
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    // Simulate checking login status from localStorage
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
        .filter((restaurant) => restaurant.menu.length > 0); // Only show restaurants with qualifying items
    }

    setFilteredRestaurants(tempRestaurants);
  };

  if (isLoggedIn === null) {
    // Still checking login status
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p>Loading...</p>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
        <h1 className="text-3xl font-bold mb-6">Welcome to CalorieQuest</h1>
        <p className="text-lg mb-8 text-center max-w-md">
          Your one-stop companion for healthy dining decisions on the go.
        </p>
        <div className="space-y-4 w-full max-w-xs">
          <Button
            onClick={handleSignIn}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            Sign in with Google (Simulated)
          </Button>
          <Button
            onClick={handleContinueAsGuest}
            variant="outline"
            className="w-full border-gray-400 text-gray-300 hover:bg-gray-700"
          >
            Continue as Guest
          </Button>
        </div>
        <MadeWithDyad />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50 p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">CalorieQuest</h1>

      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Find Your Healthy Meal</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <Label htmlFor="calorie-range" className="mb-2 block">Calorie Range</Label>
            <Select
              onValueChange={(value) => setCalorieRange(Number(value))}
              value={calorieRange?.toString() || ""}
            >
              <SelectTrigger id="calorie-range">
                <SelectValue placeholder="Select Max Calories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="600">Under 600 Calories</SelectItem>
                <SelectItem value="1000">Under 1000 Calories</SelectItem>
                <SelectItem value="9999">Any Calories</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="mb-2 block">Distance (Miles)</Label>
            <RadioGroup
              defaultValue="3"
              onValueChange={(value) => setMileage(Number(value))}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="1" id="r1" />
                <Label htmlFor="r1">1 Mile</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="3" id="r2" />
                <Label htmlFor="r2">3 Miles</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="5" id="r3" />
                <Label htmlFor="r3">5 Miles</Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <Button onClick={applyFilters} className="w-full bg-green-600 hover:bg-green-700 text-white">
          Search for Meals
        </Button>
      </div>

      <div className="max-w-2xl mx-auto">
        {filteredRestaurants.length === 0 && calorieRange !== null ? (
          <p className="text-center text-gray-600 dark:text-gray-400">
            No restaurants found matching your criteria. Try adjusting your filters!
          </p>
        ) : filteredRestaurants.length === 0 && calorieRange === null ? (
          <p className="text-center text-gray-600 dark:text-gray-400">
            Set your calorie range and distance to find nearby healthy meals.
          </p>
        ) : (
          <Accordion type="single" collapsible className="w-full">
            {filteredRestaurants.map((restaurant) => (
              <AccordionItem key={restaurant.id} value={restaurant.id}>
                <AccordionTrigger className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md mb-2">
                  <span className="font-semibold text-lg">{restaurant.name}</span>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {restaurant.menu.length} qualifying items ({restaurant.distance} miles)
                  </span>
                </AccordionTrigger>
                <AccordionContent className="p-4 bg-white dark:bg-gray-800 rounded-b-md shadow-inner">
                  <ul className="space-y-3">
                    {restaurant.menu.map((item: MenuItem) => (
                      <li key={item.id} className="flex justify-between items-center border-b pb-2 last:border-b-0 last:pb-0">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                        </div>
                        <span className="font-bold text-green-600 dark:text-green-400">{item.calories} kcal</span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>
      <MadeWithDyad />
    </div>
  );
};

export default HomePage;