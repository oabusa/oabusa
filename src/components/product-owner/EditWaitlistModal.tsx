import { useState } from "react";
import axios from "axios";
import { Dialog } from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface WaitlistEntry {
  id: number;
  FullName: string;
  Email: string;
  Company: string | null;
  Role: string | null;
}

interface Props {
  entry: WaitlistEntry;
  onClose: () => void;
  onUpdated: () => void;
}

export const EditWaitlistModal = ({ entry, onClose, onUpdated }: Props) => {
  const [formData, setFormData] = useState({ ...entry });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axios.put(`/api/waitlist/${formData.id}`, formData);
      onUpdated();
      onClose();
    } catch (err) {
      console.error("❌ Failed to update waitlist entry:", err);
      setError("Failed to update contact. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSendReminder = async () => {
  setLoading(true);
  setError("");

  try {
    await axios.post(`/api/waitlist/${formData.id}/reminder`, {
      Email: formData.Email,
      FullName: formData.FullName,
    });

    alert("✅ Reminder email sent!");
  } catch (err) {
    console.error("❌ Failed to send reminder:", err);
    setError("Failed to send reminder. Please try again.");
  } finally {
    setLoading(false);
  }
};


  return (
    <Dialog open onOpenChange={onClose}>
      <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg relative">
          <button className="absolute top-4 right-4 text-gray-500" onClick={onClose}>
            <X className="h-5 w-5" />
          </button>

          <h2 className="text-2xl font-semibold mb-4">Edit Waitlist Contact</h2>

          {error && <div className="text-red-600 mb-2">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="FullName">Full Name</Label>
              <Input name="FullName" value={formData.FullName} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="Email">Email</Label>
              <Input name="Email" value={formData.Email} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="Company">Company</Label>
              <Input name="Company" value={formData.Company || ""} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="Role">Role</Label>
              <Input name="Role" value={formData.Role || ""} onChange={handleChange} />
            </div>

            <div className="pt-2">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Updating..." : "Update Contact"}
              </Button>
            </div>
          </form>
          <div className="pt-2 grid grid-cols-2 gap-2">
            <Button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update Contact"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleSendReminder}
              disabled={loading}
            >
              Send Reminder Email
            </Button>
          </div>

        </div>
      </div>
    </Dialog>
  );
};
