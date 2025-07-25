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

interface InviteUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const InviteUserModal = ({
  isOpen,
  onClose,
  onSuccess,
}: InviteUserModalProps) => {
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
  });

  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [submitError, setSubmitError] = useState("");

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "Email") {
      if (value && !validateEmail(value)) {
        setEmailError("Please enter a valid email address.");
      } else {
        setEmailError("");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");

    const { FirstName, LastName, Email } = formData;

    if (!FirstName || !LastName || !Email) {
      setSubmitError("All fields are required.");
      return;
    }

    if (!validateEmail(Email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/user/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        onClose();
        onSuccess();
        setFormData({ FirstName: "", LastName: "", Email: "" });
      } else {
        const data = await res.json();
        setSubmitError(data.error || "Failed to send invite.");
      }
    } catch (err) {
      console.error("Invite error:", err);
      setSubmitError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md border-blue-200">
        <DialogHeader className="text-center space-y-3">
          <DialogTitle className="text-2xl font-bold text-blue-900">
            Invite New User
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <div>
            <Label htmlFor="FirstName" className="text-blue-800">
              First Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="FirstName"
              name="FirstName"
              value={formData.FirstName}
              onChange={handleChange}
              required
              className="border-blue-200 focus:border-blue-400"
            />
          </div>

          <div>
            <Label htmlFor="LastName" className="text-blue-800">
              Last Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="LastName"
              name="LastName"
              value={formData.LastName}
              onChange={handleChange}
              required
              className="border-blue-200 focus:border-blue-400"
            />
          </div>

          <div>
            <Label htmlFor="Email" className="text-blue-800">
              Email <span className="text-red-500">*</span>
            </Label>
            <Input
              id="Email"
              name="Email"
              type="email"
              value={formData.Email}
              onChange={handleChange}
              required
              className={`border-blue-200 focus:border-blue-400 ${
                emailError ? "border-red-500 focus:border-red-500" : ""
              }`}
            />
            {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
          </div>

          {submitError && <p className="text-red-600 text-sm">{submitError}</p>}

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-4"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Invitation"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
