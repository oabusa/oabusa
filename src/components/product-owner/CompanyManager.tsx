import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { EditCompanyModal } from "./EditCompanyModal";


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
  refresh: boolean;
  triggerRefresh: () => void;
}

export const CompanyManager = ({ refresh, triggerRefresh }: Props) => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchCompanies = async () => {
    try {
      const res = await axios.get("/api/company");
      setCompanies(res.data);
    } catch (err) {
      console.error("Failed to load companies:", err);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, [refresh]);

  const handleEdit = (company: Company) => {
    setSelectedCompany(company);
    setIsModalOpen(true);
  };

  const handleActivate = async (companyId: number) => {
    try {
      await axios.put(`/api/company/${companyId}/activate`);
      triggerRefresh();
    } catch (err) {
      console.error("Failed to activate company:", err);
    }
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">Company Name</th>
              <th className="px-4 py-2">Contact</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Created</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((c) => (
              <tr key={c.CompanyId} className="border-t">
                <td className="px-4 py-2">{c.CompanyName}</td>
                <td className="px-4 py-2">{c.ContactName}</td>
                <td className="px-4 py-2">{c.ContactEmail}</td>
                <td className="px-4 py-2">
                  {c.IsActive ? (
                    <span className="text-green-600 font-medium">Active</span>
                  ) : (
                    <span className="text-yellow-600 font-medium">Inactive</span>
                  )}
                </td>
                <td className="px-4 py-2">{new Date(c.CreatedOn).toLocaleDateString()}</td>
                <td className="px-4 py-2 space-x-2">
                  <Button size="sm" onClick={() => handleEdit(c)}>Edit</Button>
                  {!c.IsActive && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleActivate(c.CompanyId)}
                    >
                      Activate
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && selectedCompany && (
        <EditCompanyModal
          company={selectedCompany}
          onClose={() => setIsModalOpen(false)}
          onUpdated={triggerRefresh}
        />
      )}
    </div>
  );
};
