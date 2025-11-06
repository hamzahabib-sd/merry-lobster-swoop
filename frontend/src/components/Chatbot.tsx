"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Send, Leaf, User, Ruler, Scale, Target, Utensils, MessageSquareDashed } from "lucide-react";
import { showSuccess, showError } from "@/utils/toast";

interface Message {
  sender: "user" | "ai";
  text: string;
}

interface UserProfile {
  name: string;
  age: string;
  gender: string;
  height: string;
  weight: string;
  fitness_goal: string;
  dietary_preferences: string;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    fitness_goal: "",
    dietary_preferences: "",
  });
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await fetch("https://backend-re9n.onrender.com/api/v1/chatbot/profile", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.ok) {
            const profileData = await response.json();
            setUserProfile({
              ...profileData,
              fitness_goal: profileData.fitness_goal || "",
              dietary_preferences:
                (profileData.dietary_preferences &&
                  (Array.isArray(profileData.dietary_preferences)
                    ? profileData.dietary_preferences
                    : profileData.dietary_preferences)) ||
                "",
            });
            // Check if essential profile data is present
            if (profileData.weight && profileData.height && profileData.age && profileData.fitness_goal) {
              setIsProfileComplete(true);
              setMessages([
                {
                  sender: "ai",
                  text: "Welcome back! How can I help you with your nutrition today?",
                },
              ]);
            } else {
              setIsProfileComplete(false);
              setMessages([
                {
                  sender: "ai",
                  text: "Hello! To give you personalized advice, please tell me a bit about yourself.",
                },
              ]);
            }
          } else {
            // Profile not found or other error, show profile form
            setIsProfileComplete(false);
            setMessages([
              {
                sender: "ai",
                text: "Hello! To give you personalized advice, please tell me a bit about yourself.",
              },
            ]);
          }
        } catch (error) {
          console.error("Failed to fetch profile:", error);
          setIsProfileComplete(false);
          setMessages([
            {
              sender: "ai",
              text: "Hello! I'm having trouble loading your profile. Please fill out the form to get started.",
            },
          ]);
        }
      } else {
        // No token, user is not logged in
        setIsProfileComplete(false);
        setMessages([
          {
            sender: "ai",
            text: "Hello! To give you personalized advice, please tell me a bit about yourself.",
          },
        ]);
      }
    };

    if (isOpen) {
      fetchProfile();
    }
  }, [isOpen]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleProfileSubmit = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      showError("You must be logged in to save your profile.");
      return;
    }

    // Omitting name from the check as it's not in the form
    const { name, ...profileData } = userProfile;
    if (Object.values(profileData).every((val) => val && val.toString().trim() !== "")) {
      try {
        const response = await fetch("https://backend-re9n.onrender.com/api/v1/chatbot/profile", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...profileData,
            dietary_preferences: [profileData.dietary_preferences],
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ detail: "Failed to save profile." }));
          throw new Error(errorData.detail);
        }

        const result = await response.json();
        setIsProfileComplete(true);
        setMessages([{ sender: "ai", text: "Your profile has been updated! How can I help you with your nutrition today?" }]);
        showSuccess("Profile saved successfully!");
      } catch (error) {
        console.error("Error saving profile:", error);
        showError((error as Error).message || "Failed to save profile. Please try again.");
      }
    } else {
      showError("Please fill in all profile details.");
    }
  };

  const handleSendMessage = async () => {
    if (input.trim() === "") return;

    const newUserMessage: Message = { sender: "user", text: input };
    setMessages((prev) => [...prev, newUserMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://backend-re9n.onrender.com/api/v1/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          message: newUserMessage.text,
          profile: userProfile,
        }),
      });

      if (!response.ok) {
        throw new Error("API response was not ok.");
      }

      const result = await response.json();
      const newAiMessage: Message = { sender: "ai", text: result.reply };
      setMessages((prev) => [...prev, newAiMessage]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      const errorMessage: Message = {
        sender: "ai",
        text: "Sorry, I'm having trouble connecting. Please try again later.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="default"
            size="icon"
            className="fixed bottom-4 right-4 rounded-full h-14 w-14 shadow-lg bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white z-50"
          >
            <MessageSquare className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent className="w-full sm:w-[400px] flex flex-col bg-gradient-to-br from-blue-500 to-purple-600 text-white border-none">
          <SheetHeader className="mb-4">
            <SheetTitle className="flex items-center text-white text-2xl font-bold">
              <Leaf className="h-7 w-7 mr-2" /> AI Nutrition Chatbot
            </SheetTitle>
          </SheetHeader>
          <div className="flex-1 flex flex-col overflow-hidden">
            {!isProfileComplete ? (
              <div className="space-y-4 p-6 rounded-lg shadow-lg bg-white/10">
                <p className="text-sm text-gray-200">
                  Please provide some details to get personalized advice:
                </p>
                <div>
                  <Label htmlFor="gender" className="text-white">Gender</Label>
                  <div className="relative flex items-center">
                    <Select
                      value={userProfile.gender}
                      onValueChange={(value) => setUserProfile({ ...userProfile, gender: value })}
                    >
                      <SelectTrigger id="gender" className="pl-10 bg-white/20 text-white border-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-0">
                        <User className="absolute left-3 h-4 w-4 text-white/70" />
                        <SelectValue placeholder="Select Gender" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 text-white">
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="age" className="text-white">Age</Label>
                  <div className="relative flex items-center">
                    <Input
                      id="age"
                      type="number"
                      placeholder="e.g., 25"
                      value={userProfile.age}
                      onChange={(e) => setUserProfile({ ...userProfile, age: e.target.value })}
                      className="pl-10 bg-white/20 text-white border-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-0 placeholder:text-white/70"
                    />
                    <User className="absolute left-3 h-4 w-4 text-white/70" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="height" className="text-white">Height (cm)</Label>
                  <div className="relative flex items-center">
                    <Input
                      id="height"
                      type="number"
                      placeholder="e.g., 175"
                      value={userProfile.height}
                      onChange={(e) => setUserProfile({ ...userProfile, height: e.target.value })}
                      className="pl-10 bg-white/20 text-white border-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-0 placeholder:text-white/70"
                    />
                    <Ruler className="absolute left-3 h-4 w-4 text-white/70" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="weight" className="text-white">Weight (kg)</Label>
                  <div className="relative flex items-center">
                    <Input
                      id="weight"
                      type="number"
                      placeholder="e.g., 70"
                      value={userProfile.weight}
                      onChange={(e) => setUserProfile({ ...userProfile, weight: e.target.value })}
                      className="pl-10 bg-white/20 text-white border-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-0 placeholder:text-white/70"
                    />
                    <Scale className="absolute left-3 h-4 w-4 text-white/70" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="fitness_goal" className="text-white">Fitness Goal</Label>
                  <div className="relative flex items-center">
                    <Select
                      value={userProfile.fitness_goal}
                      onValueChange={(value) => setUserProfile({ ...userProfile, fitness_goal: value })}
                    >
                      <SelectTrigger id="fitness_goal" className="pl-10 bg-white/20 text-white border-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-0">
                        <Target className="absolute left-3 h-4 w-4 text-white/70" />
                        <SelectValue placeholder="Select Goal" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 text-white">
                        <SelectItem value="lose">Lose Weight</SelectItem>
                        <SelectItem value="gain">Gain Weight</SelectItem>
                        <SelectItem value="maintain">Maintain Weight</SelectItem>
                        <SelectItem value="muscle">Build Muscle</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="dietary_preferences" className="text-white">Preferred Diet Plan</Label>
                  <div className="relative flex items-center">
                    <Select
                      value={userProfile.dietary_preferences}
                      onValueChange={(value) => setUserProfile({ ...userProfile, dietary_preferences: value })}
                    >
                      <SelectTrigger id="dietary_preferences" className="pl-10 bg-white/20 text-white border-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-0">
                        <Utensils className="absolute left-3 h-4 w-4 text-white/70" />
                        <SelectValue placeholder="Select Diet Plan" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 text-white">
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="vegetarian">Vegetarian</SelectItem>
                        <SelectItem value="vegan">Vegan</SelectItem>
                        <SelectItem value="keto">Keto</SelectItem>
                        <SelectItem value="paleo">Paleo</SelectItem>
                        <SelectItem value="mediterranean">Mediterranean</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button onClick={handleProfileSubmit} className="w-full bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white text-lg py-3 rounded-lg shadow-md">
                  Save Profile & Start Chat
                </Button>
              </div>
            ) : (
              <>
                <ScrollArea className="flex-1 p-4 rounded-md bg-white/10 mb-4">
                  <div className="space-y-4">
                    {messages.map((msg, index) => (
                      <div
                        key={index}
                        className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[70%] p-3 rounded-lg ${
                            msg.sender === "user"
                              ? "bg-blue-400 text-white"
                              : "bg-white/20 text-white"
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    ))}
                    {isTyping && (
                      <div className="flex justify-start items-center">
                        <div className="max-w-[70%] p-3 rounded-lg bg-white/20 text-white flex items-center space-x-2">
                          <MessageSquareDashed className="h-4 w-4 animate-pulse" />
                          <span>Typing...</span>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
                <div className="flex gap-2">
                  <Input
                    placeholder="Ask a nutrition question..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleSendMessage();
                      }
                    }}
                    className="flex-1 bg-white/20 text-white border-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-0 placeholder:text-white/70"
                  />
                  <Button onClick={handleSendMessage} size="icon" disabled={isTyping} className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Chatbot;