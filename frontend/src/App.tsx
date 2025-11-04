import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage"; // New static home page
import AuthPage from "./pages/AuthPage"; // Renamed from HomePage
import FindMealPage from "./pages/FindMealPage";
import NotFound from "./pages/NotFound";
import { MadeWithDyad } from "./components/made-with-dyad";
import Chatbot from "./components/Chatbot";
import Header from "./components/Header";
import { useState, useEffect } from "react";

const queryClient = new QueryClient();

const App = () => {
  const [userStatus, setUserStatus] = useState<string | null>(null);

  useEffect(() => {
    const status = localStorage.getItem("caloriequest_user_status");
    setUserStatus(status);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("caloriequest_user_status");
    setUserStatus(null);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Header onLogout={handleLogout} userStatus={userStatus} /> 
          <Routes>
            {/* If user is logged in, redirect from Home and Auth to Find Meal */}
            <Route path="/" element={userStatus ? <Navigate to="/find-meal" /> : <HomePage />} />
            <Route path="/auth" element={userStatus ? <Navigate to="/find-meal" /> : <AuthPage setUserStatus={setUserStatus} />} />
            
            {/* If user is not logged in, redirect from Find Meal to Auth */}
            <Route path="/find-meal" element={userStatus ? <FindMealPage /> : <Navigate to="/auth" />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Chatbot />
          <MadeWithDyad />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;