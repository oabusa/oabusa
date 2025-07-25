
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Calendar } from "lucide-react";

interface RequestDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RequestDemoModal = ({ isOpen, onClose }: RequestDemoModalProps) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log("Demo request submitted:", formData);
    // Reset form and close modal
    setFormData({ fullName: "", email: "", company: "" });
    onClose();
    // You could show a success message here
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md border-blue-200 shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-blue-600 hover:text-blue-800 transition-colors"
        >
          <X className="h-6 w-6" />
        </button>
        
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-2xl text-blue-900">Request a Demo</CardTitle>
          <p className="text-blue-600 mt-2">
            See how Tasklane can transform your training process
          </p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-blue-900">Full Name *</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                className="border-blue-200 focus:border-blue-500"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-blue-900">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="border-blue-200 focus:border-blue-500"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="company" className="text-blue-900">Company (Optional)</Label>
              <Input
                id="company"
                type="text"
                placeholder="Enter your company name"
                value={formData.company}
                onChange={(e) => handleInputChange("company", e.target.value)}
                className="border-blue-200 focus:border-blue-500"
              />
            </div>
            
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <div className="flex items-center space-x-2 mb-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                <span className="text-blue-900 font-medium">Schedule Your Demo</span>
              </div>
              <p className="text-blue-700 text-sm mb-3">
                Once you submit this form, you'll receive an email with a link to schedule your personalized demo.
              </p>
              <a 
                href="https://calendly.com/tasklane-demo" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-sm underline"
              >
                Or schedule directly on Calendly →
              </a>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white"
            >
              Request Demo
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
