import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Leaf, Utensils, Target, Heart, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/auth");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 text-white p-4 sm:p-8">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-purple-600/30 backdrop-blur-sm z-0"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <Leaf className="h-20 w-20 text-green-300 mx-auto mb-6 animate-bounce" />
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 drop-shadow-lg">
            CalorieQuest: Your Path to Mindful Eating
          </h1>
          <p className="text-xl md:text-2xl mb-10 font-light max-w-2xl mx-auto">
            Discover healthy meal options nearby, track your nutrition, and achieve your wellness goals with ease.
          </p>
          <Button
            onClick={handleGetStarted}
            className="bg-gradient-to-r from-green-400 to-teal-500 hover:from-green-500 hover:to-teal-600 text-white text-xl px-8 py-6 rounded-full shadow-lg transform transition-transform hover:scale-105"
          >
            Get Started <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      <Separator className="my-16 bg-white/20" />

      {/* Features Section */}
      <section className="max-w-6xl mx-auto py-12">
        <h2 className="text-4xl font-bold text-center mb-12 drop-shadow-md">Why Choose CalorieQuest?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-white/10 border-white/20 text-white shadow-xl backdrop-blur-sm">
            <CardHeader>
              <Utensils className="h-10 w-10 text-green-400 mb-4" />
              <CardTitle className="text-2xl font-semibold">Smart Meal Finder</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-200">
                Easily find restaurants and menu items that fit your calorie goals and dietary preferences, all within your desired distance.
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="bg-white/10 border-white/20 text-white shadow-xl backdrop-blur-sm">
            <CardHeader>
              <Target className="h-10 w-10 text-green-400 mb-4" />
              <CardTitle className="text-2xl font-semibold">Personalized Guidance</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-200">
                Our AI chatbot provides tailored nutrition advice based on your profile, helping you stay on track with your fitness goals.
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="bg-white/10 border-white/20 text-white shadow-xl backdrop-blur-sm">
            <CardHeader>
              <Heart className="h-10 w-10 text-green-400 mb-4" />
              <CardTitle className="text-2xl font-semibold">Health & Wellness</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-200">
                Make informed choices about your food, improve your eating habits, and lead a healthier, more energetic life.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator className="my-16 bg-white/20" />

      {/* Call to Action Section */}
      <section className="max-w-4xl mx-auto text-center py-12">
        <h2 className="text-4xl font-bold mb-6 drop-shadow-md">Ready to Start Your Quest?</h2>
        <p className="text-xl mb-8 font-light">
          Join thousands of users who are transforming their eating habits with CalorieQuest.
        </p>
        <Button
          onClick={handleGetStarted}
          className="bg-gradient-to-r from-green-400 to-teal-500 hover:from-green-500 hover:to-teal-600 text-white text-xl px-8 py-6 rounded-full shadow-lg transform transition-transform hover:scale-105"
        >
          Sign Up Now <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </section>
    </div>
  );
};

export default HomePage;