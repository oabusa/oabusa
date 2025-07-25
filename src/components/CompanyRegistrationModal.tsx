import { useState } from "react";
import axios from "axios";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface CompanyRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const CompanyRegistrationModal = ({
  isOpen,
  onClose,
  onSuccess,
}: CompanyRegistrationModalProps) => {
  const [formData, setFormData] = useState({
    CompanyName: "",
    AddressLine1: "",
    AddressLine2: "",
    City: "",
    State: "",
    ZipCode: "",
    Phone: "",
    Email: "",
    ContactName: "",
    ContactEmail: "",
    TaxNumber: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const required = ["CompanyName", "Email", "ContactName", "ContactEmail"];
    const missing = required.find((field) => !formData[field as keyof typeof formData]);
    if (missing) {
      setError(`Please fill in ${missing}`);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await axios.post("/api/company", formData);
      if (res.status === 201) {
        onSuccess();
      } else {
        setError("Failed to register company. Try again.");
      }
    } catch (err: any) {
      console.error("Company registration error:", err);
      setError("An error occurred while submitting the form.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40" />
        <Dialog.Content className="fixed z-50 bg-white rounded-2xl shadow-lg p-6 w-full max-w-2xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-y-auto max-h-[90vh] focus:outline-none">
          <Dialog.Close asChild>
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </Dialog.Close>

          <h2 className="text-2xl font-semibold mb-4">Register Your Company</h2>

          {error && (
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="CompanyName">Company Name</Label>
              <Input name="CompanyName" value={formData.CompanyName} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="TaxNumber">Tax Number</Label>
              <Input name="TaxNumber" value={formData.TaxNumber} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="AddressLine1">Address Line 1</Label>
              <Input name="AddressLine1" value={formData.AddressLine1} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="AddressLine2">Address Line 2</Label>
              <Input name="AddressLine2" value={formData.AddressLine2} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="City">City</Label>
              <Input name="City" value={formData.City} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="State">State</Label>
              <Input name="State" value={formData.State} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="ZipCode">Zip Code</Label>
              <Input name="ZipCode" value={formData.ZipCode} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="Phone">Phone</Label>
              <Input name="Phone" value={formData.Phone} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="Email">Company Email</Label>
              <Input name="Email" value={formData.Email} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="ContactName">Contact Name</Label>
              <Input name="ContactName" value={formData.ContactName} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="ContactEmail">Contact Email</Label>
              <Input name="ContactEmail" value={formData.ContactEmail} onChange={handleChange} />
            </div>

            <div className="col-span-1 md:col-span-2 mt-4">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Submitting..." : "Submit Company"}
              </Button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
