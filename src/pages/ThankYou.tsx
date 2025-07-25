// src/pages/ThankYou.tsx
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const ThankYou = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-md text-center space-y-6 p-8 border border-blue-100 shadow-xl rounded-xl">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-blue-900">You're in!</h2>
        <p className="text-blue-600">We'll reach out when Tasklane launches.</p>
        <Button
          onClick={() => navigate("/")}
          className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800"
        >
          Go to Homepage
        </Button>
      </div>
    </div>
  );
};

export default ThankYou;
