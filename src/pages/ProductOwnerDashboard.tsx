import { useState } from "react";
import { WaitlistManager } from "@/components/product-owner/WaitlistManager";
import { CompanyManager } from "@/components/product-owner/CompanyManager";

const ProductOwnerDashboard = () => {
  const [refreshWaitlist, setRefreshWaitlist] = useState(false);
  const [refreshCompanies, setRefreshCompanies] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center">Product Owner Dashboard</h1>

      {/* Waitlist Section */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Waitlist Management</h2>
        <WaitlistManager
          refresh={refreshWaitlist}
          triggerRefresh={() => setRefreshWaitlist(!refreshWaitlist)}
        />
      </div>

      {/* Company Section */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Company Management</h2>
        <CompanyManager
          refresh={refreshCompanies}
          triggerRefresh={() => setRefreshCompanies(!refreshCompanies)}
        />
      </div>
    </div>
  );
};

export default ProductOwnerDashboard;
