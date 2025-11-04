import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FindMealPage from "./pages/FindMealPage"; // Renamed from HomePage
import NotFound from "./pages/NotFound";
import { MadeWithDyad } from "./components/made-with-dyad";
import Chatbot from "./components/Chatbot";
import Header from "./components/Header"; // Import Header
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
          {/* Render Header globally, it will adapt based on userStatus */}
          <Header onLogout={handleLogout} userStatus={userStatus} /> 
          <Routes>
            {/* If userStatus is set, redirect from root to /find-meal, otherwise show HomePage */}
            <Route path="/" element={userStatus ? <Navigate to="/find-meal" /> : <HomePage setUserStatus={setUserStatus} />} />
            {/* If userStatus is not set, redirect from /find-meal to root, otherwise show FindMealPage */}
            <Route path="/find-meal" element={userStatus ? <FindMealPage /> : <Navigate to="/" />} />
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