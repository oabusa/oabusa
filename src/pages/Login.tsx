import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { performLogout } from "@/utils/logout";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Clear all data when login page loads
  useEffect(() => {
    performLogout();
  }, []);


const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

console.log("Login request sent:", { email, password });

    if (!res.ok) {
      alert("Invalid credentials");
      return;
    }

    const data = await res.json();
    //const { userId, name, userType } = data;

    const { userId, userName, userType } = data;


    // Save to localStorage or context
    localStorage.setItem("authUser", JSON.stringify({ userId, userName, userType }));

    console.log("Incoming login:", email, password);
    console.log("DB returned user:", userName);


    // Redirect by role
    if (userType === 1) {
      navigate("/product-owner-dashboard");
    } else if (userType === 2) {
      navigate("/admin-dashboard");
    } else {
      navigate("/employee-dashboard");
    }
  } catch (err) {
    console.error("Login error:", err);
    alert("Login failed. Try again.");
  }
};



  const handleTitleClick = () => {
    navigate("/");
  };

  const handleForgotPassword = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate("/forgot-password");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 
            className="text-3xl font-bold text-blue-900 mb-2 cursor-pointer hover:text-blue-700 transition-colors"
            onClick={handleTitleClick}
          >
            Tasklane
          </h1>
          <p className="text-blue-700 text-base font-medium">
            Your voice, your process — narrate your workflow, we’ll structure the steps.
          </p>
        </div>
        
        <Card className="border-blue-200 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-blue-900">Welcome back</CardTitle>
            <CardDescription className="text-blue-600">
              Sign in to manage SOPs or complete assigned training.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-3">
                <Label htmlFor="email" className="text-blue-800">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-blue-200 focus:border-blue-400"
                  placeholder="Enter your email"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="password" className="text-blue-800">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border-blue-200 focus:border-blue-400"
                  placeholder="Enter your password"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                  Sign In
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full text-blue-700 hover:bg-blue-50 hover:text-blue-900 transition-colors font-semibold underline-offset-2"
                  onClick={handleForgotPassword}
                >
                  Forgot Password?
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
