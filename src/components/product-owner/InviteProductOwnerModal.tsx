import { useState } from "react";
import axios from "axios";
import { Dialog } from "@radix-ui/react-dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

interface InviteProductOwnerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const InviteProductOwnerModal = ({
  isOpen,
  onClose,
  onSuccess,
}: InviteProductOwnerModalProps) => {
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await axios.post("/api/user/invite", {
        ...formData,
        UserTypeId: 1, // ✅ product owner
      });

      onSuccess();
      onClose();
    } catch (err) {
      console.error("❌ Invite failed:", err);
      setError("Failed to send invitation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg relative">
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </button>

          <h2 className="text-2xl font-semibold mb-4">Invite Product Owner</h2>

          {error && <p className="text-red-600 mb-2">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="FirstName">First Name</Label>
              <Input
                name="FirstName"
                value={formData.FirstName}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="LastName">Last Name</Label>
              <Input
                name="LastName"
                value={formData.LastName}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="Email">Email</Label>
              <Input
                name="Email"
                type="email"
                value={formData.Email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="pt-2">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Sending..." : "Send Invitation"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Dialog>
  );
};
