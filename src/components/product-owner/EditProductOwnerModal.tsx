// src/components/product-owner/EditProductOwnerModal.tsx
import { useState } from "react";
import { Dialog } from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import axios from "axios";

interface ProductOwner {
  UserId: number;
  FirstName: string;
  LastName: string;
  Email: string;
  IsActive: number;
}

interface Props {
  owner: ProductOwner;
  onClose: () => void;
  onUpdated: () => void;
}

export const EditProductOwnerModal = ({ owner, onClose, onUpdated }: Props) => {
  const [formData, setFormData] = useState({ ...owner });
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
      await axios.put(`/api/user/${formData.UserId}`, {
        ...formData,
        UserTypeId: 1, // 👈 Ensure user stays a product owner
      });
      onUpdated();
      onClose();
    } catch (err) {
      console.error("❌ Failed to update product owner:", err);
      setError("Failed to update product owner.");
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

          <h2 className="text-2xl font-semibold mb-4">Edit Product Owner</h2>

          {error && <div className="text-red-600 mb-2">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="FirstName">First Name</Label>
              <Input name="FirstName" value={formData.FirstName} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="LastName">Last Name</Label>
              <Input name="LastName" value={formData.LastName} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="Email">Email</Label>
              <Input name="Email" value={formData.Email} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="IsActive">Active (1 = Yes, 0 = No)</Label>
              <Input
                name="IsActive"
                type="number"
                min={0}
                max={1}
                value={formData.IsActive}
                onChange={handleChange}
              />
            </div>

            <div className="pt-2">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Dialog>
  );
};
