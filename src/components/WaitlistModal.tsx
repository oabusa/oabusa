import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles, Zap, PartyPopper } from "lucide-react";

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;  
}

export const WaitlistModal = ({ isOpen, onClose }: WaitlistModalProps) => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setEmailError(validateEmail(newEmail) ? "" : "Please enter a valid email address.");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, company, role }),
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        const errorData = await response.json();
        console.error("Submission failed:", errorData);
      }
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsSuccess(false);
    setEmail("");
    setFullName("");
    setCompany("");
    setRole("");
    setEmailError("");
    onClose();
  };

  if (isSuccess) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md border-blue-200">
          <div className="flex flex-col items-center space-y-6 py-8 text-center">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg border-2 border-blue-200">
                <PartyPopper className="h-12 w-12 text-white animate-pulse" />
              </div>
              <Sparkles className="absolute -top-2 -right-2 h-6 w-6 text-yellow-400 animate-bounce" />
              <Zap className="absolute -bottom-2 -left-2 h-4 w-4 text-blue-300 animate-spin delay-500" />
              <PartyPopper className="absolute top-1 -left-3 h-3 w-3 text-yellow-300 animate-pulse delay-1000" />
              <Sparkles className="absolute -top-3 left-1 h-4 w-4 text-blue-400 animate-bounce delay-300" />
              <Zap className="absolute bottom-1 -right-3 h-3 w-3 text-green-400 animate-pulse delay-700" />
              <PartyPopper className="absolute -bottom-3 right-1 h-4 w-4 text-purple-400 animate-bounce delay-900" />
            </div>

            <div className="space-y-3">
              <h3 className="text-3xl font-bold text-blue-900">You're in!</h3>
              <p className="text-blue-600 max-w-sm">
                Thanks for joining Tasklane's waitlist. We'll keep you posted with early access updates and exciting announcements.
              </p>
            </div>

            <Button
              onClick={handleClose}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8"
            >
              Got it
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md border-blue-200">
        <DialogHeader className="text-center space-y-3">
          <DialogTitle className="text-2xl font-bold text-blue-900 text-center">
            Join Tasklane's Waitlist
          </DialogTitle>
          <p className="text-blue-600 text-center mx-auto max-w-sm">
            Be among the first to try voice-powered training that turns your processes into step-by-step SOPs — no more repeating yourself.
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <div>
            <Label htmlFor="fullName" className="text-blue-800">
              Full Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              placeholder="John Doe"
              className="border-blue-200 focus:border-blue-400"
            />
          </div>

          <div>
            <Label htmlFor="email" className="text-blue-800">
              Email <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              required
              placeholder="john@company.com"
              className={`border-blue-200 focus:border-blue-400 ${
                emailError ? "border-red-500 focus:border-red-500" : ""
              }`}
            />
            {emailError && (
              <p className="text-red-500 text-sm mt-1">{emailError}</p>
            )}
          </div>

          <div>
            <Label htmlFor="company" className="text-blue-800">
              Company Name (Optional)
            </Label>
            <Input
              id="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Acme Inc."
              className="border-blue-200 focus:border-blue-400"
            />
          </div>

          <div>
            <Label htmlFor="role" className="text-blue-800">
              Your Role / Title (Optional)
            </Label>
            <Input
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Operations Manager"
              className="border-blue-200 focus:border-blue-400"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-6"
            disabled={isSubmitting || !!emailError || !email || !fullName}
          >
            {isSubmitting ? "Joining..." : "Join Waitlist"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
