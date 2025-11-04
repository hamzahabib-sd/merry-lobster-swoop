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
  gender: string;
  height: string;
  weight: string;
  goal: string;
  dietPlan: string;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [userProfile, setUserProfile] = useState<UserProfile>({
    gender: "",
    height: "",
    weight: "",
    goal: "",
    dietPlan: "",
  });
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load profile from localStorage
    const savedProfile = localStorage.getItem("chatbot_user_profile");
    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile));
      setIsProfileComplete(true);
      setMessages([{ sender: "ai", text: "Welcome back! How can I help you with your nutrition today?" }]);
    } else {
      setMessages([{ sender: "ai", text: "Hello! To give you personalized advice, please tell me a bit about yourself." }]);
    }
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleProfileSubmit = () => {
    if (Object.values(userProfile).every((val) => val !== "")) {
      localStorage.setItem("chatbot_user_profile", JSON.stringify(userProfile));
      setIsProfileComplete(true);
      setMessages([
        { sender: "ai", text: "Thank you! Your profile is set. How can I help you with your nutrition today?" },
      ]);
      showSuccess("Profile saved successfully!");
    } else {
      showError("Please fill in all profile details.");
    }
  };

  const generateMockAIResponse = (userMessage: string, profile: UserProfile): string => {
    const lowerCaseMessage = userMessage.toLowerCase();

    if (lowerCaseMessage.includes("calories in an omelet") || lowerCaseMessage.includes("omelet calories")) {
      return "A typical 2-egg omelet with some veggies is around 150-200 calories, depending on ingredients and cooking oil. Adding cheese or meat will increase this.";
    }
    if (lowerCaseMessage.includes("lose weight")) {
      return `To lose weight, ${profile.gender === "male" ? "you" : "you"} should aim for a calorie deficit. Focus on lean proteins, whole grains, and plenty of vegetables. Given your goal to ${profile.goal}, consider incorporating more cardio and strength training.`;
    }
    if (lowerCaseMessage.includes("gain weight")) {
      return `To gain weight, ${profile.gender === "male" ? "you" : "you"} need a calorie surplus with adequate protein. Focus on nutrient-dense foods like nuts, avocados, and healthy fats. Given your goal to ${profile.goal}, ensure you're consuming enough protein for muscle growth.`;
    }
    if (lowerCaseMessage.includes("healthy snack")) {
      return "Great healthy snack options include a handful of almonds, an apple with peanut butter, Greek yogurt, or carrot sticks with hummus.";
    }
    if (lowerCaseMessage.includes("protein")) {
      return "Protein is crucial for muscle repair and growth. Good sources include chicken, fish, beans, lentils, and dairy. For your weight of ${profile.weight} lbs, aiming for around 0.7-1 gram of protein per pound of body weight is often recommended, especially if you're active.";
    }
    if (lowerCaseMessage.includes("diet plan")) {
      return `You mentioned your preferred diet plan is ${profile.dietPlan}. Sticking to this plan while ensuring a balanced intake of macronutrients and micronutrients is key. Would you like to know more about specific foods within your diet plan?`;
    }
    if (lowerCaseMessage.includes("thank you") || lowerCaseMessage.includes("thanks")) {
      return "You're welcome! Is there anything else I can assist you with?";
    }

    return "I'm a mock nutrition chatbot and can answer basic questions about calories, weight goals, and healthy eating. Please ask me something specific about nutrition!";
  };

  const handleSendMessage = async () => {
    if (input.trim() === "") return;

    const newUserMessage: Message = { sender: "user", text: input };
    setMessages((prev) => [...prev, newUserMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const aiResponseText = generateMockAIResponse(newUserMessage.text, userProfile);
    const newAiMessage: Message = { sender: "ai", text: aiResponseText };
    setMessages((prev) => [...prev, newAiMessage]);
    setIsTyping(false);
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
        <SheetContent className="w-full sm:w-[400px] flex flex-col bg-gradient-to-br from-blue-500 to-purple-600 text-white">
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
                      <SelectTrigger id="gender" className="pl-10 bg-white/20 text-white border-white/30 focus:ring-offset-0 focus:ring-white/50">
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
                  <Label htmlFor="height" className="text-white">Height (cm)</Label>
                  <div className="relative flex items-center">
                    <Input
                      id="height"
                      type="number"
                      placeholder="e.g., 175"
                      value={userProfile.height}
                      onChange={(e) => setUserProfile({ ...userProfile, height: e.target.value })}
                      className="pl-10 bg-white/20 text-white border-white/30 focus:ring-offset-0 focus:ring-white/50 placeholder:text-white/70"
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
                      className="pl-10 bg-white/20 text-white border-white/30 focus:ring-offset-0 focus:ring-white/50 placeholder:text-white/70"
                    />
                    <Scale className="absolute left-3 h-4 w-4 text-white/70" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="goal" className="text-white">Fitness Goal</Label>
                  <div className="relative flex items-center">
                    <Select
                      value={userProfile.goal}
                      onValueChange={(value) => setUserProfile({ ...userProfile, goal: value })}
                    >
                      <SelectTrigger id="goal" className="pl-10 bg-white/20 text-white border-white/30 focus:ring-offset-0 focus:ring-white/50">
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
                  <Label htmlFor="dietPlan" className="text-white">Preferred Diet Plan</Label>
                  <div className="relative flex items-center">
                    <Select
                      value={userProfile.dietPlan}
                      onValueChange={(value) => setUserProfile({ ...userProfile, dietPlan: value })}
                    >
                      <SelectTrigger id="dietPlan" className="pl-10 bg-white/20 text-white border-white/30 focus:ring-offset-0 focus:ring-white/50">
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
                    className="flex-1 bg-white/20 text-white border-white/30 focus:ring-offset-0 focus:ring-white/50 placeholder:text-white/70"
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