"use client";

import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Google } from "lucide-react"; // Using a generic icon for Google for now

const AuthScreen = () => {
  const navigate = useNavigate();

  const handleGuestLogin = () => {
    navigate("/home");
  };

  const handleGoogleLogin = () => {
    // In a frontend-only application, direct Google SSO is not possible without a backend.
    // This is a placeholder to demonstrate the intended flow.
    alert("Google Sign-In is out of scope for this frontend-only MVP. Please continue as guest.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 to-blue-500 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-gray-800">CalorieQuest</CardTitle>
          <CardDescription className="text-gray-600 mt-2">
            Your companion for healthy dining decisions.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={handleGuestLogin}
            className="w-full bg-green-600 hover:bg-green-700 text-white text-lg py-6 rounded-lg shadow-md transition-all duration-200"
          >
            Continue as Guest
          </Button>
          <div className="flex items-center space-x-2">
            <Separator className="flex-grow" />
            <span className="text-sm text-gray-500">OR</span>
            <Separator className="flex-grow" />
          </div>
          <Button
            onClick={handleGoogleLogin}
            variant="outline"
            className="w-full flex items-center justify-center gap-2 text-lg py-6 rounded-lg shadow-md transition-all duration-200 border-gray-300 hover:bg-gray-50"
          >
            <Google className="h-5 w-5" />
            Sign in with Google
          </Button>
          <p className="text-center text-sm text-gray-500 mt-4">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthScreen;