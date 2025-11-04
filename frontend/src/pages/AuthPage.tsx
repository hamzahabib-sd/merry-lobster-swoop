import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Leaf } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AuthPageProps {
  setUserStatus: (status: string) => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ setUserStatus }) => {
  const navigate = useNavigate();

  // No longer redirecting from here, App.tsx handles it
  // useEffect(() => {
  //   const userStatus = localStorage.getItem("caloriequest_user_status");
  //   if (userStatus) {
  //     navigate("/find-meal");
  //   }
  // }, [navigate]);

  const handleSignIn = () => {
    localStorage.setItem("caloriequest_user_status", "loggedIn");
    setUserStatus("loggedIn");
    navigate("/find-meal");
  };

  const handleContinueAsGuest = () => {
    localStorage.setItem("caloriequest_user_status", "guest");
    setUserStatus("guest");
    navigate("/find-meal");
  };

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
          className="w-full bg-transparent border border-white text-white hover:bg-white/20 text-lg py-3 rounded-lg shadow-md"
        >
          Continue as Guest
        </Button>
      </div>
    </div>
  );
};

export default AuthPage;