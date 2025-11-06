import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Leaf } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const signUpSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const signInSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

interface AuthPageProps {
  setUserStatus: (status: string) => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ setUserStatus }) => {
  const [isSigningUp, setIsSigningUp] = useState(true);
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(isSigningUp ? signUpSchema : signInSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });

  const handleAuthAction = async (values: any) => {
    const url = isSigningUp
      ? "https://backend-re9n.onrender.com/api/v1/auth/signup"
      : "https://backend-re9n.onrender.com/api/v1/auth/login";
    const method = "POST";
    const body = isSigningUp
      ? JSON.stringify(values)
      : new URLSearchParams({
          username: values.email,
          password: values.password,
        }).toString();

    const headers = isSigningUp
      ? { "Content-Type": "application/json" }
      : { "Content-Type": "application/x-www-form-urlencoded" };

    try {
      const response = await fetch(url, {
        method,
        headers,
        body,
      });

      if (response.ok) {
        if (isSigningUp) {
          toast.success("Signup successful!");
          setIsSigningUp(false);
        } else {
          const data = await response.json();
          localStorage.setItem("token", data.access_token);
          localStorage.setItem("caloriequest_user_status", "loggedIn");
          setUserStatus("loggedIn");
          toast.success("Login successful!");
          navigate("/find-meal");
        }
      } else {
        const errorData = await response.json();
        toast.error(errorData.detail || "Authentication failed");
      }
    } catch (error) {
      toast.error("An error occurred during authentication.");
      console.error("An error occurred during authentication:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="flex items-center space-x-4 mb-8">
        <Leaf className="h-12 w-12 text-green-500" />
        <h1 className="text-5xl font-extrabold text-gray-800 dark:text-white">
          CalorieQuest
        </h1>
      </div>
      <p className="text-xl mb-10 text-center max-w-md font-light text-gray-600 dark:text-gray-300">
        Your one-stop companion for healthy dining decisions on the go.
      </p>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            {isSigningUp ? "Create an Account" : "Sign In"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleAuthAction)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                {isSigningUp ? "Sign Up" : "Sign In"}
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center">
            <Button
              variant="link"
              onClick={() => setIsSigningUp(!isSigningUp)}
            >
              {isSigningUp
                ? "Already have an account? Sign In"
                : "Don't have an account? Sign Up"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthPage;