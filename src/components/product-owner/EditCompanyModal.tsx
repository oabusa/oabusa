import { useState } from "react";
import axios from "axios";
import { Dialog } from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface Company {
  CompanyId: number;
  CompanyName: string;
  AddressLine1: string;
  AddressLine2: string;
  City: string;
  State: string;
  ZipCode: string;
  Phone: string;
  Email: string;
  ContactName: string;
  ContactEmail: string;
  TaxNumber: string;
}

interface Props {
  company: Company;
  onClose: () => void;
  onUpdated: () => void;
}

export const EditCompanyModal = ({ company, onClose, onUpdated }: Props) => {
  const [formData, setFormData] = useState({ ...company });
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
    setLoading(true);
    setError("");

    try {
      await axios.put(`/api/company/${formData.CompanyId}`, formData);
      onUpdated();
      onClose();
    } catch (err) {
      console.error("Failed to update company:", err);
      setError("An error occurred while updating.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-3xl relative overflow-y-auto max-h-[90vh]">
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </button>

          <h2 className="text-2xl font-semibold mb-4">Edit Company</h2>

          {error && <div className="text-red-600 mb-4">{error}</div>}

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="CompanyName">Company Name</Label>
              <Input name="CompanyName" value={formData.CompanyName} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="TaxNumber">Tax Number</Label>
              <Input name="TaxNumber" value={formData.TaxNumber || ""} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="AddressLine1">Address Line 1</Label>
              <Input name="AddressLine1" value={formData.AddressLine1 || ""} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="AddressLine2">Address Line 2</Label>
              <Input name="AddressLine2" value={formData.AddressLine2 || ""} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="City">City</Label>
              <Input name="City" value={formData.City || ""} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="State">State</Label>
              <Input name="State" value={formData.State || ""} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="ZipCode">Zip Code</Label>
              <Input name="ZipCode" value={formData.ZipCode || ""} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="Phone">Phone</Label>
              <Input name="Phone" value={formData.Phone || ""} onChange={handleChange} />
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

            <div className="col-span-1 md:col-span-2 pt-4">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Updating..." : "Update Company"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Dialog>
  );
};
